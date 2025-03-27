const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const recursion = require(".././experiment/recursion");

async function commitRepo(message) {
    console.log("Commit function called");
    const repoPath = path.resolve(process.cwd(), ".git");
    const stagedPath = path.join(repoPath, "staging");
    const commitDir = path.join(repoPath, "commitDir");

    try {
        let results = await recursion(stagedPath);
        console.log(results);
        const commitId = uuidv4();
        const commitJson = path.join(commitDir, "commitsJson");
        
        const relativePaths = results.map((result) => path.relative(stagedPath, result));

        for (const result of results) {
            let ans = result.replace(/\\staging\\/g, "\\commitDir\\commits\\");
            let dirName = path.dirname(ans);
            await fs.mkdir(dirName, {recursive:true});
            await fs.copyFile(
                result,
                ans,
            );
        }

        await fs.writeFile(path.join(commitJson, `${commitId}.json`), JSON.stringify({msg:message, date: new Date().toISOString(), filePaths:relativePaths, _id:commitId}));
        console.log(`Commit ${commitId} created with message : ${message}.`);
        
    } catch (error) {
        console.error("error in committing files:", error);
    }
}

module.exports = {
    commitRepo
};