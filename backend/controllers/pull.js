const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config");
const supabase = require("../config/supabaseConfig");
const mongoose = require("mongoose");

//importing models
const repoFilePaths = require("../models/repoFilePathsModel");

async function pullRepo() {
    console.log("pull function called");
    const repoPath = path.resolve(process.cwd(), ".git");

    const remoteRefPath = path.join(repoPath, "refs", "remoteRef.json");

    const ref = await fs.readFile(remoteRefPath);
    const { remoteRef } = JSON.parse(ref);
    const url = new URL(remoteRef);
    let pathSegments = url.pathname.split("/").filter(Boolean);

    const rootPath = path.resolve(process.cwd(), "root");
    try {
        const mongoUri = process.env.MONGODB_URI;
        mongoose.connect(mongoUri)
            .then(() => console.log("MongoDB connected"))

        const existingDoc = await repoFilePaths.findOne({ reponame: pathSegments[1] });
        const filePaths = existingDoc.bucketFilePaths;

        for (const filePath of filePaths) {
            const { data, error } = await supabase
                .storage
                .from('.git')
                .download(filePath)

            if (error) {
                console.error("Download failed:", error);
            }
            // Convert the downloaded data (Buffer) to a file
            const arrayBuffer = await data.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const dirName = path.dirname(filePath);
            await fs.mkdir(path.join(rootPath, dirName), { recursive: true });

            // Save the file locally
            await fs.writeFile(path.join(rootPath, filePath), buffer);
            console.log(`File downloaded and saved to: ${path.join(rootPath, filePath)}`);
        }

        await mongoose.connection.close();
        console.log("🧹 MongoDB connection closed.");
        console.log("All commits pulled from s3");
        process.exit(0);
    }
    catch (error) {
        console.error("Unable to pull: ", error);
    }
}

module.exports = {
    pullRepo
};