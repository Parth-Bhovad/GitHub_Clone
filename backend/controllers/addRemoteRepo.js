const fs = require("fs").promises;
const path = require("path");

const addRemoteRepo = async (link) => {
    const refsPath = path.resolve(process.cwd(), ".git", "refs");
    try {
        await fs.mkdir(refsPath, {recursive:true});
        await fs.writeFile(path.join(refsPath, "remoteRef"), JSON.stringify(link));
        console.log("remote refs added locally");
    } catch (error) {
        console.log("error", error);
    }
}

module.exports = {addRemoteRepo};