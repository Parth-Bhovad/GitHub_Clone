import { Link } from "react-router-dom";

//importing custom css
import "../styles/dashboard.css"

//importing custom hooks
import useDashboard from "../hooks/useDashboard";

function Dashboard() {

    const { suggestedRepositories, repositories, searchQuery, setSearchQuery, searchResults } = useDashboard();

    return (
        <>
            <section id="dashboard">
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
                <main>
                    <h3>Your Repositories</h3>
                    <div id="search">
                        <input type="text" value={searchQuery} placeholder="Find a repository..." onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <div className="repoList">
                        {searchResults.length == 0 ? repositories.map((repo) => {
                            return (
                                <Link to={`/${repo.username}/${repo.reponame}`} style={{ textDecoration: "none" }}>
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
                <section className="rightAside">
                    <h3>Upcoming Events</h3>
                    <ul>
                        <li>
                            <p>Tech Conference - Dec 15</p>
                            <p>Developer MeetUp - Jan 15</p>
                            <p>React Summit - Jan 30</p>
                        </li>
                    </ul>
                </section>
            </section>
        </>
    );
}

export default Dashboard;