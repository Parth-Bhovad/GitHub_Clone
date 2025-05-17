import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
//importing APIs
import { fetchRepositoryByName } from "../api/repoAPI";


function useRepoAuth() {
    const { reponame } = useParams();

    const [repository, setRepository] = useState({});

    const handleFetchRepositoryByName = async (reponame) => {
        try {
            const response = await fetchRepositoryByName(reponame);
            setRepository(response);
        } catch (error) {
            console.log("error during fetch Repository :", error);
        }
    }

    useEffect(() => {
        handleFetchRepositoryByName(reponame);
    }, [reponame]);

    return {repository};
}

export default useRepoAuth;