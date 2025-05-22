//importing css
import "../styles/createRepo.css";

//importing custom hooks
import useCreateRepo from "../hooks/useCreateRepo";
import useRepoFormState from "../hooks/useRepoFormState";
import useFetchProfileUrl from "../../user/hooks/useFetchProfileUrl";
import useFetchUsernameFromId from "../../user/hooks/useFetchUsernameFromId";

//importing context
import { useAuthContext } from "../../user/context/authContext";
//importing components
import UserAvatar from "../../../components/common/UserAvatar";


const CreateRepo = () => {
    const { currentUser } = useAuthContext();

    const { handleUpload } = useCreateRepo();
    const { reponame, setRepoName, description, setDescription, visibility, setVisibility } = useRepoFormState();
    const { username } = useFetchUsernameFromId(currentUser)
    const { profileUrl } = useFetchProfileUrl(username);

    return (
        <>
            <div className="container">
                <div className="d-1">
                    <h1>Create a new repository</h1>
                    <p>A repository contains all project files, including the revision history. Already have a project repository elsewhere? <a href="#">Import a repository.</a></p>
                    <hr />
                </div>

                <div className="d-2">
                    <p><i>Required fields are marked with an asterisk (*).</i></p>
                    <div className="owner-reponame">
                        <div className="owner-container">
                            <p>Owner*</p>
                            <div className="owner">
                                <UserAvatar src={profileUrl} />
                                <p>{username}</p>
                            </div>
                        </div>

                        <p className="slash">/</p>

                        <div className="reponame-container">
                            <p>Repository name*</p>
                            <div className="reponame">
                                <input type="text" name="name" value={reponame} onChange={(e) => setRepoName(e.target.value)} />
                            </div>
                        </div>

                    </div>
                    <p>Great repository names are short and memorable. Need inspiration? How about potential-octo-enigma ?</p>
                    <div className="description">
                        <label htmlFor="description">Description (optional)</label>
                        <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <hr />
                </div>

                <div className="d-3">
                    <input type="radio" name="visibility" id="public" value={"true"} checked={visibility === true} onChange={(e) => setVisibility(e.target.value === "true")} />
                    <label htmlFor="public">Public</label>
                    <input type="radio" name="visibility" id="private" value={"false"} checked={visibility === false} onChange={(e) => setVisibility(e.target.value === "true")} />
                    <label htmlFor="private">Private</label>

                    <hr />
                </div>

                <div className="d-4">
                    <p>You are creating a private repository in your personal account.</p>
                    <hr />
                </div>

                <button onClick={() => { handleUpload(reponame, description, visibility, currentUser, username) }}>Create repository</button>
            </div>
        </>
    );
}

export default CreateRepo;