import { Link } from "react-router-dom";

function SuggestedRepoCard({username, reponame, id}) {
    return (
    <Link to={`/${username}/${reponame}`} key={id}>
        <div key={id}>
            <p>{`${username}/${reponame}`}</p>
        </div>
    </Link>);
}

export default SuggestedRepoCard;