import { useState, useEffect } from 'react';

//importing APIs
import { fetchRepositories, fetchSuggestedRepositories } from "../api/dashboardAPI"

function useDashboard() {

    const [repositories, setRepositories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestedRepositories, setSuggestedRepositories] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

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

        const handleFetchSuggestedRepositories = async () => {
            try {
                const suggestedRepos = await fetchSuggestedRepositories();
                setSuggestedRepositories(suggestedRepos);
                console.log(suggestedRepos);
            } catch (error) {
                console.error("Error while fetching repositories", error);
            }
        };

        handleFetchRepositories(userId);
        handleFetchSuggestedRepositories();
    }, []);

    // if (repositories.length > 0) {
        useEffect(() => {
            if (searchQuery == "") {
                setSearchResults([]);
            } else {
                const filteredRepo = repositories.filter((repo) => repo.reponame.toLowerCase().includes(searchQuery.toLowerCase()));
                console.log(filteredRepo);
                setSearchResults(filteredRepo);
            }
        }, [searchQuery, repositories]);
    // }

    return {suggestedRepositories, repositories, searchQuery, setSearchQuery, searchResults};
}

export default useDashboard;