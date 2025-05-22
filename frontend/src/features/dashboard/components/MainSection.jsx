import { Link } from "react-router-dom";

//importing custom hooks
import useFetchRepo from "../hooks/useFetchRepo";
import useSearchRepo from "../hooks/useSearchRepo";

function MainSection() {
    const { repositories } = useFetchRepo();
    const { searchQuery, setSearchQuery, searchResults } = useSearchRepo(repositories);

    return (
        <main>
            <h3>Your Repositories</h3>
            <div id="search">
                <input type="text" value={searchQuery} placeholder="Find a repository..." onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="repoList">
                {searchResults.length == 0 ? repositories.map((repo) => {
                    return (
                        <Link to={`/${repo.username}/${repo.reponame}`} style={{ textDecoration: "none" }} key={repo._id}>
                            <div key={repo._id} className="repoContainer">
                                <h2>{repo.reponame}</h2>
                                <p>{repo.description}</p>
                            </div>
                        </Link>
                    );
                }) : searchResults.map((repo) => {
                    return (
                        <Link to="/repo/show" style={{ textDecoration: "none" }}>
                            <div key={repo._id} className="repoContainer">
                                <h2>{repo.reponame}</h2>
                                <p>{repo.description}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}

export default MainSection;