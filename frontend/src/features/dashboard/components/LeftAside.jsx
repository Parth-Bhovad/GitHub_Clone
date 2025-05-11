import { Link } from "react-router-dom";

//importing custom hooks
import useDashboard from "../hooks/useDashboard";

function LeftAside() {
    const { suggestedRepositories } = useDashboard();
    return (
        <section className="leftAside">
            <h3>Suggested Repositories</h3>
            <div className="repoList">
                {suggestedRepositories.map((repo) => {
                    return (
                        <Link to={`/${repo.username}/${repo.reponame}`}>
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