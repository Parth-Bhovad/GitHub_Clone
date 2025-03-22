const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const Issue = require("../models/issueModel");
const User = require("../models/userModel");


const createRepository = async (req, res) => {
    const { owner, name, issues, content, description, visibility } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ error: "Repostitoy name is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ error: "Invalid User ID" });
        }

        const newRepository = new Repository({ ...req.body });
        const result = await newRepository.save();

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
        const repositories = await Repository.find({})
            .populate("owner")
            .populate("issues")
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
        const repository = await Repository.findOne({ name: repoName })
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
    console.log(userId);
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

module.exports = {
    createRepository,
    getAllRepositories,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoriesForCurrentUser,
    updateRepositoryById,
    toggleVisibiltyById,
    deleteRepositoryById
};