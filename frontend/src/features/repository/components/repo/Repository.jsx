import { useParams } from "react-router-dom";

//routes
import RepoRoutes from "../../Routes/RepoRoutes";

//Importing components
import UnderlineNav from "../../../../components/layout/UnderlineNav";

//importing repo context
import { RepoProvider } from "../../context/useRepoContext";

export default function ShowRepo() {

    const { reponame, username } = useParams();

    return (
        <>
            <UnderlineNav reponame={reponame} username={username} />

            <RepoProvider>
                <RepoRoutes />
            </RepoProvider>
        </>
    );
}