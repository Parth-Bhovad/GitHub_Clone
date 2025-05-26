//importing components
import SearchBar from "../../../components/common/SearchBar";
import RepoList from "./RepoList"

//importing custom hooks
import useFetchRepo from "../hooks/useFetchRepo";
import useSearchRepo from "../hooks/useSearchRepo";

function MainSection() {
    const { repositories } = useFetchRepo();
    const { searchQuery, setSearchQuery, searchResults } = useSearchRepo(repositories);

    return (
        <main>
            <h3>Your Repositories</h3>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <RepoList repositories={repositories} searchResults={searchResults} />
        </main>
    );
}

export default MainSection;