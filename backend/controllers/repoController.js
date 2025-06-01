import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import Issue from "../models/issueModel.js";
import User from "../models/userModel.js";
import RepoFilePaths from "../models/repoFilePathsModel.js";
import Commit from "../models/commitModel.js";
import Repo from "../models/repoModel.js";
import supabase from "../config/supabaseConfig.js";
import path from "path";

export const createRepository = async (req, res) => {
    const { owner, reponame, issues, content, description, visibility } = req.body;

    try {
        if (!reponame) {
            return res.status(400).json({ error: "Repostitoy name is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ error: "Invalid User ID" });
        }

        const newRepository = new Repository({ ...req.body });
        const result = await newRepository.save();

        const existingUser = await User.findById({ _id: owner });
        existingUser.repositories.push(newRepository._id);
        await existingUser.save()

        res.status(201).json({
            message: "Repository created",
            repositoryID: result._id,
        });

    } catch (error) {
        console.error("Error during repository creation: ", error.message);
        res.status(500).send("Server error");
    }
};

export const getAllRepositories = async (req, res) => {
    try {
        const repositories = await Repository.find({});
        res.json(repositories);
    } catch (error) {
        console.error("Error in fetching repo", error.message);
        res.status(500).send("sever error");
    }
};

export const fetchRepositoryById = async (req, res) => {
    const repoID = req.params.id;

    try {
        const repository = await Repository.findById(repoID)
            .populate("owner")
            .populate("issues")
        res.json(repository)
    } catch (error) {
        console.error("Error in fetching repo", error.message);
        res.status(500).send("sever error");
    }

};

export const fetchRepositoryByName = async (req, res) => {
    const repoName = req.params.name;

    try {
        const repository = await Repository.findOne({ reponame: repoName });
        res.json(repository)
    } catch (error) {
        console.error("Error in fetching repo", error.message);
        res.status(500).send("sever error");
    }
};

export const fetchRepositoriesForCurrentUser = async (req, res) => {
    const userId = req.params.userID;
    try {
        const repositories = await Repository.find({ owner: userId });
        if (!repositories) {
            return res.status(404).json({ error: "User repositories not found" });
        }

        res.json({ message: "Repositories found", repositories });
    } catch (error) {
        console.error("Error in fetching user repo", error.message);
        res.status(500).send("sever error");
    }
};

export const updateRepositoryById = async (req, res) => {
    const { id } = req.params;
    const { content, description } = req.body;

    try {
        const repository = await Repository.findById(id);

        if (!repository) {
            return res.status(404).json({ error: "repository not found" });
        }

        repository.content.push(content);
        repository.description = description;
        const updatedRepository = await repository.save();

        res.json({
            message: "repository updated",
            repository: updatedRepository
        })
    } catch (error) {
        console.error("Error in updating repo", error.message);
        res.status(500).send("sever error");
    }
};

export const toggleVisibiltyById = async (req, res) => {
    const { id } = req.params;

    try {
        const repository = await Repository.findById(id);

        if (!repository) {
            return res.status(404).json({ error: "repository not found" });
        }

        repository.visibility = !repository.visibility
        const updatedRepository = await repository.save();

        res.json({
            message: "repository visibility toggled",
            repository: updatedRepository
        })
    } catch (error) {
        console.error("Error during toggling visibility", error.message);
        res.status(500).send("sever error");
    }
};

export const deleteRepositoryById = async (req, res) => {
    const { id } = req.params;

    try {
        await Repository.findByIdAndDelete(id);

        res.json({ message: "repository deleted", });
    } catch (error) {
        console.error("Error during repository deleting", error.message);
        res.status(500).send("sever error");
    }
};

export const getAllFilePaths = async (req, res) => {
    try {
        let reponame = req.params.reponame;
        const filePaths = await Repository.findOne({ reponame });
        res.json(filePaths.content);
    } catch (error) {
        console.log(error);
    }
}

export const getSupabsePublicUrl = async (req, res) => {
    try {
        const pathParam = req.params[0];
        const { data } = supabase.storage.from(".git").getPublicUrl(pathParam);
        if (!data || !data.publicUrl) {
            throw new Error("Failed to generate public URL.");
        }

        res.json(data.publicUrl);
    } catch (error) {
        console.log(error);
    }
}

export const getFileExtension = async (req, res) => {
    const filePath = req.query.filePath;
    const extension = path.extname(filePath).replace('.', ''); // Remove the dot from the extension
    res.json({ extension });
}

export const push = async (req, res) => {
    try {
        const { files, username, reponame, commits } = req.body;

        let bucketFilePaths = [];

        for (const file of files) {
            const finalUrl = path.join(username, reponame, file.path);
            const { data, error } = await supabase
                .storage
                .from('.git')
                .upload(finalUrl, file.content, { upsert: true });
            if (error) {
                console.error("Upload failed:", error.message);
                return res.status(500).json({ error: "Failed to upload files on supabase" });
            }
            bucketFilePaths.push(finalUrl);
        }

        let commitIds = [];

        for (const commit of commits) {
            const newCommit = new Commit({
                msg: commit.msg,
                date: commit.date,
                filePaths: commit.filePaths,
                _id: commit._id,
                reponame: reponame
            });
            await newCommit.save();
            commitIds.push(commit._id);
        }

        const exitingRepo = await Repo.findOne({ reponame });
        if (exitingRepo) {
            const newBucketFilePaths = exitingRepo.content.concat(bucketFilePaths);
            const newCommitIds = exitingRepo.commitIds.concat(commitIds);
            await Repo.findOneAndUpdate({ reponame }, { $set: { content: newBucketFilePaths, commitIds: newCommitIds } }, { returnDocument: "after" });
        }

        res.status(200).json({ message: "Files uploaded successfully" });

    } catch (error) {
        console.error("Error during push operation:", error);
        res.status(500).json({ error: "Failed to push changes" });
    }
}

export const pull = async (req, res) => {
    const { reponame } = req.params;
    try {
        const existingRepo = await Repository.findOne({ reponame });
        if (!existingRepo) {
            return res.status(404).json({ message: "Repository not found" });
        }

        const filePaths = existingRepo.content;
        const files = [];

        for (const filePath of filePaths) {
            const { data, error } = await supabase
                .storage
                .from('.git')
                .download(filePath);

            if (error) {
                console.error(`Failed to download ${filePath}:`, error);
                continue;
            }

            const textContent = await data.text();

            files.push({
                path: filePath,
                content: textContent
            });
        }
        // Send all files as JSON response
        res.status(200).json({
            reponame,
            files
        });
    } catch (err) {
        console.error("Pull failed:", err);
        res.status(500).json({ message: "Server error" });
    }
};