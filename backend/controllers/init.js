const fs = require("fs").promises;
const path = require("path");

async function initRepo() {
    console.log("Init Command called");
    const repoPath = path.resolve(process.cwd(), ".git");
    const commitsPath = path.join(repoPath, "commits");

    try {
        await fs.mkdir(repoPath, { recursive: true });
        await fs.mkdir(commitsPath, { recursive: true });
        await fs.writeFile(
            path.join(repoPath, "config.json"),
            JSON.stringify({ bucket: process.env.S3_BUCKET })
        );
        console.log("Repository intialised");
    } catch (error) {
        console.error("Error initailizing repository", err);
    }
}

module.exports = { initRepo };