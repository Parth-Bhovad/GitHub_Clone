import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinaryConfig.js";
import * as userController from "../controllers/userController.js";
import { isLoggedIn, isOwner } from "../middleware/authorizeMiddleware.js";

const upload = multer({ storage });
const userRouter = express.Router();

userRouter.get("/allUsers", isLoggedIn, userController.getAllUsers);
userRouter.patch("/following/:id", isLoggedIn, userController.following);
userRouter.get("/is-following/:id", isLoggedIn, userController.isFollowing);
userRouter.get("/username/:id", isLoggedIn, userController.getCurrentUsername);
userRouter.get("/userProfile/:username", isLoggedIn, userController.getUserProfile);
userRouter.post("/signup", userController.signup);
userRouter.post("/upload/:username", isLoggedIn, isOwner, upload.single("profileUrl"), userController.uploadProfileUrl);
userRouter.get("/profileUrl/:username", isLoggedIn, userController.getProfileUrl);
userRouter.post("/login", userController.login);
userRouter.put("/updateProfile/:id", isLoggedIn, isOwner, userController.updateUserProfile);
userRouter.delete("/deleteProfile/:id", isLoggedIn, isOwner, userController.deleteUserProfile);
userRouter.post("/logout", isLoggedIn, userController.logout);

export default userRouter;
