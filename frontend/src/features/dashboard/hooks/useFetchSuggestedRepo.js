import { useState, useEffect } from 'react';

//importing APIs
import { fetchSuggestedRepositories } from "../api/dashboardAPI"

function useFetchSuggestedRepo() {
    const [suggestedRepositories, setSuggestedRepositories] = useState([]);

    useEffect(() => {
        const handleFetchSuggestedRepositories = async () => {
            try {
                const suggestedRepos = await fetchSuggestedRepositories();
                setSuggestedRepositories(suggestedRepos);
                // console.log(suggestedRepos);
            } catch (error) {
                console.error("Error while fetching repositories", error);
            }
        };
        handleFetchSuggestedRepositories();
    }, [])
    return {suggestedRepositories};
}

export default useFetchSuggestedRepo;