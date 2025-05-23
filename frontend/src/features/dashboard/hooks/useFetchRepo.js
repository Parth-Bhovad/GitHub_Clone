import { useState, useEffect } from 'react';

//importing APIs
import { fetchRepositories } from "../api/dashboardAPI"

function useFetchRepo() {
    const [repositories, setRepositories] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const handleFetchRepositories = async (userId) => {
            try {
                const repos = await fetchRepositories(userId)

                setRepositories(repos);
            } catch (error) {
                console.error("Error while fetching repositories", error);
            }
        };
        handleFetchRepositories(userId);
    }, []);

    return { repositories };
}

export default useFetchRepo;