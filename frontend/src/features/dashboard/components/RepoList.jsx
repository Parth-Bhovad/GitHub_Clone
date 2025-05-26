import RepoCard from "./RepoCard";

function RepoList({repositories, searchResults}) {
    return (
        <div className="repoList">
            {searchResults.length == 0 ? repositories.map((repo) => {
                return (
                    <RepoCard username={repo.username} reponame={repo.reponame} key={repo._id} description={repo.description} />
                );
            }) : searchResults.map((repo) => {
                return (
                    <RepoCard username={repo.username} reponame={repo.reponame} key={repo._id} description={repo.description} />
                );
            })}
        </div>
    );
}

export default RepoList;