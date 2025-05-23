import { useParams } from "react-router-dom";

//importing components
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import HeatMapProfile from "./HeatMap";

// importing css
import "../styles/profile.css";

//importing custom hooks
import useHandleFollow from "../hooks/useHandleFollow";
import useAuth from "../hooks/useAuth";
import useFetchUserDetails from "../hooks/useFetchUserDetails";
import useProfileUpload from "../hooks/useProfileUpload"

//importing auth context
import { useAuthContext } from "../context/authContext";

function Profile() {
    const {currentUser } = useAuthContext()
    const {username} = useParams();
    const {userDetails} = useFetchUserDetails(username);
    const {handleUpload, setFile} = useProfileUpload(username);
    const { handleFollow, isFollow } = useHandleFollow(currentUser, userDetails._id);
    const { handleLogout } = useAuth();

    return (
        <>
            <UnderlineNav aria-label="Repository">
                <UnderlineNav.Item
                    aria-current="page"
                    icon={BookIcon}
                    sx={{
                        backgroundColor: "transparent",
                        color: "white",
                        "&:hover": {
                            textDecoration: "underline",
                            color: "white",
                        },
                    }}
                >
                    Overview
                </UnderlineNav.Item>

                <UnderlineNav.Item
                    onClick={() => navigate("/repo")}
                    icon={RepoIcon}
                    sx={{
                        backgroundColor: "transparent",
                        color: "whitesmoke",
                        "&:hover": {
                            textDecoration: "underline",
                            color: "white",
                        },
                    }}
                >
                    Starred Repositories
                </UnderlineNav.Item>
            </UnderlineNav>

            <button
                onClick={handleLogout}
                style={{ position: "fixed", bottom: "50px", right: "50px" }}
                id="logout"
            >
                Logout
            </button>

            <div className="profile-page-wrapper">
                <div className="user-profile-section">
                    <div className="profile-image">
                        {userDetails.profileUrl ? <img src={userDetails.profileUrl} alt="profile" /> : <p>No profileUrl</p>}
                    </div>
                    {String(currentUser) === String(userDetails?._id) ?
                        <div>
                            <label htmlFor="profile"></label>
                            <input type="file" id="profile" name="profileUrl" onChange={(e) => setFile(e.target.files[0])} />
                            <button onClick={handleUpload}>Upload</button>
                        </div>
                        : null}

                    <div className="name">
                        <h1>{userDetails?.username}</h1>
                    </div>

                    {String(currentUser) === String(userDetails?._id)
                        ? null
                        : <button className="follow-btn" onClick={handleFollow}>{isFollow ? "Unfollow" : "Follow"}</button>}

                    {<div className="follower">
                        <p>{userDetails?.follower?.length > 0 ? userDetails?.follower?.length : 0} Follower</p>
                        <p>.</p>
                        <p>{userDetails?.following?.length > 0 ? userDetails?.following?.length : 0} Following</p>
                    </div>}
                </div>

                <div className="heat-map-section">
                    <HeatMapProfile />
                </div>
            </div>
        </>
    );
}

export default Profile;