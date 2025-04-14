const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config");
const supabase = require("../config/supabaseConfig");
const recursion = require("../experiment/recursion");
const mongoose = require("mongoose");

//importing models
const Repo = require("../models/repoModel");
const Commit = require("../models/commitModel");

async function pushRepo() {
    console.log("Push function called");
    const repoPath = path.resolve(process.cwd(), ".git");
    const commitDir = path.join(repoPath, "commitDir");
    const commitPaths = path.join(commitDir, "commits");

    const remoteRefPath = path.join(repoPath, "refs", "remoteRef.json");

    const ref = await fs.readFile(remoteRefPath);
    const { remoteRef } = JSON.parse(ref);
    const url = new URL(remoteRef);
    let pathSegments = url.pathname.split("/").filter(Boolean);

    const commitJsonPath = path.join(commitDir, "commitsJson");
    const commitsJson = await fs.readdir(commitJsonPath);
    // const decodedRepoName = decodeURIComponent(pathSegments[1]);
    // console.log(decodedRepoName);
    const startUrl = `${pathSegments[0]}/${pathSegments[1]}`;
    let bucketFilePaths = [];
    try {
        const mongoUri = process.env.MONGODB_URI;
        mongoose.connect(mongoUri)
            .then(() => console.log("MongoDB connected"))
            .catch((error) => console.error("Unable to connect :", error));


            let results = await recursion(commitPaths);
            const relativePaths = results.map((result) => path.relative(commitPaths, result));
            let i = 0;
            for (const result of results) {
                const finalUrl = path.join(startUrl, relativePaths[i]);
                console.log(finalUrl);
                const fileContent = await fs.readFile(result);
                const { data, error } = await supabase
                    .storage
                    .from('.git')
                    .upload(finalUrl, fileContent, { upsert: true });
    
                if (error) {
                    console.error("Upload failed:", error.message);
                } else {
                    console.log(`Uploaded: ${result}`);
                }
                bucketFilePaths.push(finalUrl);
                i++;
            }


        let commitIds = [];

        for (const commitJson of commitsJson) {
            console.log(commitJson);
            const commitFile = await fs.readFile(path.join(commitJsonPath, commitJson));
            const commit = JSON.parse(commitFile);
            console.log(commit);

            const newCommit = new Commit({ msg: commit.msg, date: commit.date, filePaths: commit.filePaths, _id: commit._id, reponame: pathSegments[1] });
            await newCommit.save();
            console.log(newCommit);
            let commitId = newCommit._id;
            console.log(commitId);
            commitIds.push(commitId);
        }
        console.log(commitIds);

        const exitingRepo = await Repo.findOne({ reponame: pathSegments[1] });
        console.log(exitingRepo);
        if (exitingRepo) {
            const newBucketFilePaths = exitingRepo.content.concat(bucketFilePaths);

            let updatedRepo = await Repo.findOneAndUpdate({reponame: pathSegments[1]}, { $set: { content: newBucketFilePaths, commitIds } },{ returnDocument: "after" });
            console.log(updatedRepo);
            
        }

        await mongoose.connection.close();
        console.log("🧹 MongoDB connection closed.");
        console.log("all commits pushed to S3.");
        process.exit(0);
    } catch (error) {
        console.error("Error pushing to S3:", error);
    }
}

module.exports = {
    pushRepo
};