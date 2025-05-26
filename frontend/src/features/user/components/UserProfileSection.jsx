import { useParams } from "react-router-dom";

//importing components
import ProfileImage from "./ProfileImage";
import FollowBtn from "./FollowBtn";
import UserFollow from "./UserFollow";

//importing custom hooks
import useHandleFollow from "../hooks/useHandleFollow";
import useFetchUserDetails from "../hooks/useFetchUserDetails";
import useProfileUpload from "../hooks/useProfileUpload"

//importing auth context
import { useAuthContext } from "../context/authContext";

function UserProfileSection() {
    
    const {currentUser} = useAuthContext();
    
    const { username } = useParams();
    const { userDetails } = useFetchUserDetails(username);
    const { handleUpload, setFile } = useProfileUpload(username);
    const { handleFollow, isFollow } = useHandleFollow(currentUser, userDetails._id);

    return (
        <div className="user-profile-section">
            <ProfileImage profileUrl={userDetails.profileUrl} userDetailsId={userDetails._id} setFile={setFile} handleUpload={handleUpload} />

            <div className="name">
                <h1>{userDetails?.username}</h1>
            </div>

            <FollowBtn userDetailsId={userDetails._id} handleFollow={handleFollow} isFollow={isFollow} />

            <UserFollow followers={userDetails.followers} following={userDetails.following} />
        </div>
    );
}

export default UserProfileSection;