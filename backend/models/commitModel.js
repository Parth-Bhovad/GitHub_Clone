import mongoose from "mongoose";
const { Schema } = mongoose;

const CommitSchema = new Schema({
    _id: {
        type: String,
    },
    reponame: {
        type: String
    },
    msg: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    filePaths: {
        type: [String],
        required: true,
        default: []
    }
}, { _id: false });

const Commit = mongoose.model("Commit", CommitSchema);

export default Commit;