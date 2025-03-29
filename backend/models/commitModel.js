const mongoose = require("mongoose");
const {Schema} = mongoose;

const CommitSchema = new Schema({
    _id:{
        type:String,
    },
    reponame:{
        type:String
    },
    msg:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    filePaths: {
        type: [String],    // ✅ Proper way to define array of strings
        required: true,
        default: []        // ✅ Default value at the array level
    }
}, { _id: false }); // Prevents Mongoose from auto-generating _id

const Commit = mongoose.model("Commit", CommitSchema);

module.exports = Commit