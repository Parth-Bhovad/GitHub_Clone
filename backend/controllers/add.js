const fs = require("fs").promises;
const path = require("path");

async function addRepo(filePath) {
    console.log("Add function called");
    const repoPath = path.resolve(process.cwd(), ".git");
    const stagingPath = path.join(repoPath, "staing");

    try {
        await fs.mkdir(stagingPath, {recursive:true});
        const fileName = path.basename(filePath);
        await fs.copyFile(filePath, path.join(stagingPath, fileName));
        console.log(`file ${fileName} added to the staging area!`);
        
    } catch (error) {
        
    }
}

module.exports = {addRepo};