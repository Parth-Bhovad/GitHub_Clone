const mongoose = require("mongoose");
const {Schema} = mongoose;

const RepositorySchema = new Schema({
    reponame:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    content:[{
        type:String
    }],
    visibility:{
        type:Boolean,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    commitIds:[{
        type:String,
        ref:"Commit",
    }],
    issues:[{
        type:Schema.Types.ObjectId,
        ref:"Issue",
    }],
});

const Repository = mongoose.model("Repository", RepositorySchema);

module.exports = Repository;