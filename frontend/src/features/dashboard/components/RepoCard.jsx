import { Link } from "react-router-dom";

function RepoCard({ username, reponame, id, description }) {
    return (
        <Link to={`/${username}/${reponame}`} style={{ textDecoration: "none" }} key={id}>
            <div key={id} className="repoContainer">
                <h2>{reponame}</h2>
                <p>{description}</p>
            </div>
        </Link>
    );
}

export default RepoCard;