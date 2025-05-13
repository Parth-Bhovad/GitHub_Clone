const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const Issue = require("../models/issueModel");
const User = require("../models/userModel");
const RepoFilePaths = require("../models/repoFilePathsModel");
const supabase = require("../config/supabaseConfig");
const path = require("path");


const createRepository = async (req, res) => {
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

const getAllRepositories = async (req, res) => {
    try {
        const repositories = await Repository.find({});
        res.json(repositories);
    } catch (error) {
        console.error("Error in fetching repo", error.message);
        res.status(500).send("sever error");
    }
};

const fetchRepositoryById = async (req, res) => {
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

const fetchRepositoryByName = async (req, res) => {
    const repoName = req.params.name;

    try {
        const repository = await Repository.findOne({ reponame: repoName })
            .populate("owner")
            .populate("issues")
        res.json(repository)
    } catch (error) {
        console.error("Error in fetching repo", error.message);
        res.status(500).send("sever error");
    }
};

const fetchRepositoriesForCurrentUser = async (req, res) => {
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

const updateRepositoryById = async (req, res) => {
    const { id } = req.params;
    const { content, description } = req.body;

    try {
        const repository = await Repository.findById(id);

        if (!repository) {
            return res.status(404).json({ error: "repository not found" });
        }

        repository.content.push(content);
        repository.description = description;
        const updatedRepository = repository.save();

        res.json({
            message: "repository updated",
            repository: updatedRepository
        })
    } catch (error) {
        console.error("Error in updating repo", error.message);
        res.status(500).send("sever error");
    }
};

const toggleVisibiltyById = async (req, res) => {
    const { id } = req.params;

    try {
        const repository = await Repository.findById(id);

        if (!repository) {
            return res.status(404).json({ error: "repository not found" });
        }

        repository.visibility = !repository.visibility
        const updatedRepository = repository.save();

        res.json({
            message: "repository visibility toggled",
            repository: updatedRepository
        })
    } catch (error) {
        console.error("Error during toggling visibility", error.message);
        res.status(500).send("sever error");
    }
};

const deleteRepositoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteRepository = await Repository.findByIdAndDelete(id);

        res.json({ message: "repository deleted", });
    } catch (error) {
        console.error("Error during repository deleting", error.message);
        res.status(500).send("sever error");
    }
};

const getAllFilePaths = async (req, res) => {
    try {
        let reponame = req.params.reponame;
        const filePaths = await Repository.findOne({ reponame });
        res.json(filePaths.content);
    } catch (error) {
        console.log(error);
    }
}

const getSupabsePublicUrl = async (req, res) => {
    try {
        const path = req.params[0];
        const { data } = supabase.storage.from(".git").getPublicUrl(path);
        if (!data || !data.publicUrl) {
            throw new Error("Failed to generate public URL.");
        }

        res.json(data.publicUrl);
    } catch (error) {
        console.log(error);
    }
}

const getFileExtension = async (req, res) => {
    const filePath = req.query.filePath;
    const extension = path.extname(filePath).replace('.', ''); // Remove the dot from the extension
    res.json({ extension });
}

module.exports = {
    createRepository,
    getAllRepositories,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoriesForCurrentUser,
    updateRepositoryById,
    toggleVisibiltyById,
    deleteRepositoryById,
    getAllFilePaths,
    getSupabsePublicUrl,
    getFileExtension
};