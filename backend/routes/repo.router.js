const express = require("express");
const repoController = require("../controllers/repoController");

//importing middlewares
const { isLoggedIn, isOwner } = require("../middleware/authorizeMiddleware");

const repoRouter = express.Router();
repoRouter.get("/repo/allFilesPath/:reponame", isLoggedIn, repoController.getAllFilePaths);
repoRouter.get("/repo/publicUrl/*", repoController.getSupabsePublicUrl)
repoRouter.post("/repo/create", isLoggedIn, repoController.createRepository);
repoRouter.get("/repo/all", isLoggedIn, repoController.getAllRepositories);
repoRouter.get("/repo/:id", isLoggedIn, repoController.fetchRepositoryById);
repoRouter.get("/repo/name/:name", isLoggedIn, repoController.fetchRepositoryByName);
repoRouter.get("/repo/user/:userID", isLoggedIn, repoController.fetchRepositoriesForCurrentUser);
repoRouter.put("/repo/update/:id", isLoggedIn, isOwner, repoController.updateRepositoryById);
repoRouter.delete("/repo/delete/:id", isLoggedIn, isOwner, repoController.deleteRepositoryById);
repoRouter.patch("/repo/toggle/:id", isLoggedIn, isOwner, repoController.toggleVisibiltyById);

module.exports = repoRouter;