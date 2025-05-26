function UserFollow({ followers, following }) {
        return (
        <>
            {<div className="follower">
                <p>{followers?.length > 0 ? followers?.length : 0} Follower</p>
                <p>.</p>
                <p>{following?.length > 0 ? following?.length : 0} Following</p>
            </div>}
        </>
    );
}

export default UserFollow;