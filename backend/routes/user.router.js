const express = require("express");
const multer = require("multer");
const {storage} = require("../config/cloudinaryConfig");
const upload = multer({storage})
const userController = require("../controllers/userController");

const userRouter = express.Router();

//importing middlewares
const {isLoggedIn, isOwner} = require("../middleware/authorizeMiddleware");

userRouter.get("/allUsers", isLoggedIn, userController.getAllUsers);
userRouter.patch("/following/:id", isLoggedIn, userController.following);
userRouter.get("/username/:id", isLoggedIn, userController.getCurrentUsername);
userRouter.get("/userProfile/:username", isLoggedIn, userController.getUserProfile);
userRouter.post("/signup", userController.signup);
userRouter.post("/upload/:username", isLoggedIn, isOwner, upload.single("profileUrl"), userController.uploadProfileUrl);
userRouter.get("/profileUrl/:username", isLoggedIn, userController.getProfileUrl);
userRouter.post("/login", userController.login);
userRouter.put("/updateProfile/:id", isLoggedIn, isOwner, userController.updateUserProfile);
userRouter.delete("/deleteProfile/:id", isLoggedIn, isOwner, userController.deleteUserProfile);
userRouter.post("/logout", isLoggedIn ,userController.logout);

module.exports = userRouter;