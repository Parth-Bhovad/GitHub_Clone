const express = require("express");
const multer = require("multer");
const {storage} = require("../config/cloudinaryConfig");
const upload = multer({storage})
const userController = require("../controllers/userController");

const userRouter = express.Router();

//importing middlewares
const attachUserId = require("../middleware/attachUserId");

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.get("/userProfile/:id", userController.getUserProfile);
userRouter.post("/signup", userController.signup);
userRouter.post("/upload/:id", attachUserId, upload.single("profileUrl"), userController.uploadProfileUrl);
userRouter.get("/profileUrl/:id", userController.getProfileUrl);
userRouter.post("/login", userController.login);
userRouter.put("/updateProfile/:id", userController.updateUserProfile);
userRouter.delete("/deleteProfile/:id", userController.deleteUserProfile);


module.exports = userRouter;