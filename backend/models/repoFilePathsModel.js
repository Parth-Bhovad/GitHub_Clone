const mongoose = require("mongoose");
const {Schema} = mongoose;
const repoFilePathsSchema = new Schema({
    reponame:{
        type:String
    },
    bucketFilePaths:{
        type:[String],
        default:[]
    }
});

const repoFilePath = mongoose.model("repoFilePath", repoFilePathsSchema);

module.exports = repoFilePath;