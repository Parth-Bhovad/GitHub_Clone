//importing Components
import SuggestedRepoCard from "./SuggestedRepoCard";

//importing custom hooks
import useFetchSuggestedRepo from "../hooks/useFetchSuggestedRepo";

function SuggestedRepoList() {
    const { suggestedRepositories } = useFetchSuggestedRepo();

    return (
        <div className="repoList">
            {suggestedRepositories.filter(repo => repo.visibility === true).map((repo) => {
                return (
                    <SuggestedRepoCard username={repo.username} reponame={repo.reponame} key={repo._id} />
                )
            })}
        </div>
    );
}

export default SuggestedRepoList;