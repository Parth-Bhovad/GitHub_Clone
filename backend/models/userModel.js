const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    profileUrl:{
        type:String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    repositeries: [{
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

const User = mongoose.model("User", UserSchema);

module.exports = User;