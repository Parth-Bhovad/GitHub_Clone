const fs = require("fs").promises;
const path = require("path");

async function addRepo(filePath) {
    console.log("Add function called");
    const repoPath = path.resolve(process.cwd(), ".git");
    const stagingPath = path.join(repoPath, "staging");

    try {
        await fs.mkdir(stagingPath, {recursive:true});
        const fileName = path.basename(filePath);
        const dirName = path.dirname(filePath);
        await fs.mkdir(path.join(stagingPath, dirName), {recursive:true});
        await fs.copyFile(filePath, path.join(stagingPath, filePath));
        console.log(`file ${fileName} added to the staging area!`);
        
    } catch (error) {
        console.log("error during adding the files", error);
    }
}

module.exports = {addRepo};
