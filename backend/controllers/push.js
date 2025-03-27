const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config");
const supabase = require("../config/supabaseConfig");
const recursion = require("../experiment/recursion");

async function pushRepo() {
    console.log("Push function called");
    const repoPath = path.resolve(process.cwd(), ".git");
    const commitDir = path.join(repoPath, "commitDir");
    const commitPaths = path.join(commitDir, "commits");

    const remoteRefPath = path.join(repoPath, "refs", "remoteRef.json");

    const ref = await fs.readFile(remoteRefPath);
    const { remoteRef } = JSON.parse(ref);
    const url = new URL(remoteRef);
    pathSegments = url.pathname.split("/").filter(Boolean);

    const startUrl = `${pathSegments[0]}/${pathSegments[1]}`;
    try {
        let results = await recursion(commitPaths);
        const relativePaths = results.map((result) => path.relative(commitPaths, result));
        let i = 0;
        for (const result of results) {
            const finalUrl = path.join(startUrl, relativePaths[i]);
            console.log(finalUrl);
            const fileContent = fs.readFile(result);
            const { data, error } = await supabase
                .storage
                .from('.git')
                .upload(finalUrl, fileContent, { upsert: true });

            if (error) {
                console.error("Upload failed:", error.message);
            } else {
                console.log(`Uploaded: ${result}`);
            }

            i++;
        }

        console.log("all commits pushed to S3.");
    } catch (error) {
        console.error("Error pushing to S3:", error);
    }
}

module.exports = {
    pushRepo
};