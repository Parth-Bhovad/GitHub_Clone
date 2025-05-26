//importing auth context
import { useAuthContext } from "../context/authContext";

function FollowBtn({ userDetailsId, handleFollow, isFollow }) {
    const { currentUser } = useAuthContext();

    return (
        <>
            {String(currentUser) === String(userDetailsId)
                ? null
                : <button className="follow-btn" onClick={handleFollow}>{isFollow == true ? "Unfollow" : "Follow"}</button>}
        </>
    );
}

export default FollowBtn;