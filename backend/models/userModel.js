import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    profileUrl: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    repositories: [{
        default: [],
        type: Schema.Types.ObjectId,
        ref: "Repository",
    }],
    followers: [{
        default: [],
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    following: [{
        default: [],
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    starRepos: [{
        default: [],
        type: Schema.Types.ObjectId,
        ref: "Repository",
    }],
});

const User = model("User", UserSchema);

export default User;