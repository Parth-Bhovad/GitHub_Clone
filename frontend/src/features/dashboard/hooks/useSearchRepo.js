import { useState, useEffect } from 'react';

function useSearchRepo({ repositories }) {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (searchQuery == "") {
            setSearchResults([]);
        } else {
            const filteredRepo = repositories.filter((repo) => repo.reponame.toLowerCase().includes(searchQuery.toLowerCase()));
            setSearchResults(filteredRepo);
        }
    }, [searchQuery]);
    return { searchQuery, setSearchQuery, searchResults };
}

export default useSearchRepo;