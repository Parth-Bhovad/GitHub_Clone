const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config");
const supabase = require("../config/supabaseConfig");

const getCommitId = async () => {
    const configPath = path.resolve(process.cwd(),".git", "userConfig", "userConfig.json");
    const userConfig = await fs.readFile(configPath, "utf8")
    const config = JSON.parse(userConfig);
    const userId = config.userId;

    const { data, error } = await supabase
        .storage
        .from('.git')
        .list(`${userId}`, {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
        });


    if (error) {
        console.error("Error fetching file list:", error.message);
    } else {
        console.log("Files in storage:", data);
    }
    const commitId = data.map((data) => data.name);
    console.log(commitId);
    return commitId;
}

const getFileName = async (commitIds) => {
    const configPath = path.resolve(process.cwd(), "config", "userConfig.json");
    const userConfig = await fs.readFile(configPath, "utf8")
    const config = JSON.parse(userConfig);
    const userId = config.userId;

    let fileNameArray = [];

    for (const commitId of commitIds) {
        const { data, error } = await supabase
            .storage
            .from('.git')
            .list(`${userId}/${commitId}`, {
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' },
            });


        if (error) {
            console.error("Error fetching file list:", error.message);
        } else {
            console.log("Files in storage:", data);
        }

        let fileName = data.map((data) => data.name);
        fileNameArray.push(...fileName);
        console.log(fileName);
    }

    console.log(fileNameArray);
    return fileNameArray;
}

async function pullRepo() {
    console.log("pull function called");
    const repoPath = path.resolve(process.cwd(), ".git");
    const commitsPath = path.join(repoPath, "commits");

    const configPath = path.resolve(process.cwd(), "config", "userConfig.json");

    const userConfig = await fs.readFile(configPath, "utf8")
    const config = JSON.parse(userConfig);
    const userId = config.userId;

    try {
        let commitIds = await getCommitId();
        let fileNames = await getFileName(commitIds);

        for (const commitId of commitIds) {

            //make new directory for storing locally
            await fs.mkdir(path.join(commitsPath, commitId));

            for (const fileName of fileNames) {
                let pulledFilePath = `${commitId}/${fileName}`;

                const { data, error } = await supabase
                    .storage
                    .from('.git')
                    .download(`${userId}/${pulledFilePath}`);

                // Convert the downloaded data (Buffer) to a file
                const arrayBuffer = await data.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                // Save the file locally
                await fs.writeFile(path.join(commitsPath, pulledFilePath), buffer);
                console.log(`File downloaded and saved to: ${path.join(commitsPath, pulledFilePath)}`);
            }
        }

        console.log("All commits pulled from s3");
    }
    catch (error) {
        console.error("Unable to pull: ", error);
    }
}

module.exports = {
    pullRepo
};