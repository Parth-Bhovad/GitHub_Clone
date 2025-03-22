const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config");
const supabase = require("../config/supabaseConfig");
const getUserIdFromToken = require("../utils/getUserIdFromToken");
const express = require("express");

async function pushRepo() {
    console.log("Push function called");
    const repoPath = path.resolve(process.cwd(), ".git");
    const commitsPath = path.join(repoPath, "commits");

    const configPath = path.resolve(process.cwd(), "config", "userConfig.json");

    const userConfig = await fs.readFile(configPath, "utf8")
    const config = JSON.parse(userConfig);
    const userId = config.userId;
    try {
        const commitDirs = await fs.readdir(commitsPath);
        for (const commitDir of commitDirs) {
            const commitPath = path.join(commitsPath, commitDir);
            const fileName = path.basename(commitPath);
            const files = await fs.readdir(commitPath);

            for (const file of files) {
                const filePath = path.join(commitPath, file);
                const fileContent = await fs.readFile(filePath);
                const { data, error } = await supabase
                    .storage
                    .from('.git')
                    .upload(`${userId}/${fileName}/${file}`, fileContent, { upsert: true });

                    if (error) {
                        console.error("Upload failed:", error.message);
                    } else {
                        console.log(`Uploaded: ${file}`);
                    }
            }
        }
        console.log("all commits pushed to S3.");

    } catch (error) {
        console.error("Error pushing to S3:", error);
    }
}

module.exports = {
    pushRepo
};