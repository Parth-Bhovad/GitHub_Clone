const express = require("express");
const multer = require("multer");
const {storage} = require("../config/cloudinaryConfig");
const upload = multer({storage})
const userController = require("../controllers/userController");

const userRouter = express.Router();

//importing middlewares
const attachUserId = require("../middleware/attachUserId");

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.patch("/following/:id", userController.following);
userRouter.get("/username/:id", userController.getCurrentUsername);
userRouter.get("/userProfile/:username", userController.getUserProfile);
userRouter.post("/signup", userController.signup);
userRouter.post("/upload/:username", attachUserId, upload.single("profileUrl"), userController.uploadProfileUrl);
userRouter.get("/profileUrl/:username", userController.getProfileUrl);
userRouter.post("/login", userController.login);
userRouter.put("/updateProfile/:id", userController.updateUserProfile);
userRouter.delete("/deleteProfile/:id", userController.deleteUserProfile);


module.exports = userRouter;