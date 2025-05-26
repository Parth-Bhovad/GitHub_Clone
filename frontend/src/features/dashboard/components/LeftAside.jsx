//importing components
import SuggestedRepoList from "./SuggestedRepoList";

function LeftAside() {
    return (
        <section className="leftAside">
            <h3>Suggested Repositories</h3>
            <SuggestedRepoList />
        </section>
    );
}

export default LeftAside;