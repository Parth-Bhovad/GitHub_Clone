const mongoose = require("mongoose");
const {Schema} = mongoose;

const CommitSchema = new Schema({
    _id:{
        type:String,
        required:true,
        unique:true
    },
    repoId:{
        type:Schema.Types.ObjectId,
        ref: "Repository",
        required: true
    },
    msg:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    filePaths:[{
        default:[],
        type:String,
        required:true,
    }]
}, { _id: false });  // Prevents Mongoose from auto-generating _id

const Commit = mongoose.model("Commit", CommitSchema);

module.exports = Commit