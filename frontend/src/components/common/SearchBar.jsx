function SearchBar({searchQuery, setSearchQuery}) {
    return (
        <div id="search">
            <input type="text" value={searchQuery} placeholder="Find a repository..." onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
    );
}

export default SearchBar;