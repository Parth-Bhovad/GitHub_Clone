import { Link } from "react-router-dom";

//importing custom hooks
import useFetchSuggestedRepo from "../hooks/useFetchSuggestedRepo";

function LeftAside() {
    const { suggestedRepositories } = useFetchSuggestedRepo();
    return (
        <section className="leftAside">
            <h3>Suggested Repositories</h3>
            <div className="repoList">
                {suggestedRepositories.filter(repo => repo.visibility === true).map((repo) => {
                    return (
                        <Link to={`/${repo.username}/${repo.reponame}`} key={repo._id}>
                            <div key={repo._id}>
                                <p>{`${repo.username}/${repo.reponame}`}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    );
}

export default LeftAside;