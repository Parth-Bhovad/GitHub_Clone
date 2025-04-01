const express = require("express");
const repoController = require("../controllers/repoController");

const repoRouter = express.Router();
repoRouter.get("/repo/allFilesPath/:reponame", repoController.getAllFilePaths);
repoRouter.get("/repo/publicUrl/*", repoController.getSupabsePublicUrl)
repoRouter.post("/repo/create", repoController.createRepository);
repoRouter.get("/repo/all", repoController.getAllRepositories);
repoRouter.get("/repo/:id", repoController.fetchRepositoryById);
repoRouter.get("/repo/name/:name", repoController.fetchRepositoryByName);
repoRouter.get("/repo/user/:userID", repoController.fetchRepositoriesForCurrentUser);
repoRouter.put("/repo/update/:id", repoController.updateRepositoryById);
repoRouter.delete("/repo/delete/:id", repoController.deleteRepositoryById);
repoRouter.patch("/repo/toggle/:id", repoController.toggleVisibiltyById);

module.exports = repoRouter;