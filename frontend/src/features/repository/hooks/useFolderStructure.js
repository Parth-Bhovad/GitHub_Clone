import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Importing utility functions
import { buildHierarchy } from "../utils/buildHierarchy";

// importing APIs
import { fetchBucketFilePaths } from "../api/repoAPI";

function useFolderStructure() {
    const { reponame } = useParams();

    const [tree, setTree] = useState({});

    useEffect(() => {
        if (reponame) {
            console.log("getFolderStructure");

            const getFolderStructure = async () => {
                let links = await fetchBucketFilePaths(reponame);
                console.log(links);

                let result = buildHierarchy(links);
                console.log(result);

                setTree(result);
            };
            getFolderStructure();
        }
    }, []);

    return { tree };
}

export default useFolderStructure;