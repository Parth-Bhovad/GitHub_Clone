const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

async function commitRepo(message) {
    console.log("Commit function called");
    const repoPath = path.resolve(process.cwd(), ".git");
    const stagedPath = path.join(repoPath, "staging");
    const commitDir = path.join(repoPath, "commitDir");
    const commitsPath = path.join(commitDir, commits);

    try {
        const commitId = uuidv4();
        const commitJson = path.join(commitDir, "commitsJson");
        // const commitJsonId = path.join(commitJson, commitId);
        // await fs.mkdir(commitJsonId, {recursive:true});
        // const files = await fs.readdir(stagedPath);
        // for (const file of files) {
        //     await fs.copyFile(
        //         path.join(stagedPath, file),
        //         path.join(commitDir, file)
        //     );
        // }

        await fs.writeFile(path.join(commitJson, `${commitId}.json`), JSON.stringify({msg:message, date: new Date().toISOString(), filePaths:"d", _id:commitId}));
        console.log(`Commit ${commitId} created with message : ${message}.`);
        
    } catch (error) {
        console.error("error in committing files:", error);
    }
}

module.exports = {
    commitRepo
};