const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

async function commitRepo(message) {
    console.log("Commit function called");
    const repoPath = path.resolve(process.cwd(), ".git");
    const stagedPath = path.join(repoPath, "staing");
    const commitPath = path.join(repoPath, "commits");


    try {
        const commitId = uuidv4();
        const commitDir = path.join(commitPath, commitId);
        await fs.mkdir(commitDir, {recursive:true});
        const files = await fs.readdir(stagedPath);
        for (const file of files) {
            await fs.copyFile(
                path.join(stagedPath, file),
                path.join(commitDir, file)
            );
        }

        await fs.writeFile(path.join(commitDir, "commit.json"), JSON.stringify({message, date: new Date().toISOString()}));
        console.log(`Commit ${commitId} created with message : ${message}.`);
        
    } catch (error) {
        console.error("error in committing files:", error);
    }
}

module.exports = {
    commitRepo
};