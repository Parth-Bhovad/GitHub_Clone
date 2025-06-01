import mongoose from "mongoose";
const { Schema } = mongoose;

const repoFilePathsSchema = new Schema({
    reponame: {
        type: String
    },
    bucketFilePaths: {
        type: [String],
        default: []
    }
});

const repoFilePath = mongoose.model("repoFilePath", repoFilePathsSchema);

export default repoFilePath;