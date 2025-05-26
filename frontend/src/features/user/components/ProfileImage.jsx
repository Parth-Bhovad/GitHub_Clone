//importing auth context
import { useAuthContext } from "../context/authContext";

function ProfileImage({ profileUrl, userDetailsId, setFile, handleUpload }) {
    const { currentUser } = useAuthContext();
    return (
        <>
            <div className="profile-image">
                {profileUrl ? <img src={profileUrl} alt="profile" /> : <p>No profileUrl</p>}
            </div>
            {String(currentUser) === String(userDetailsId) ?
                <div>
                    <label htmlFor="profile"></label>
                    <input type="file" id="profile" name="profileUrl" onChange={(e) => setFile(e.target.files[0])} />
                    <button onClick={handleUpload}>Upload</button>
                </div>
                :
                null}
        </>
    );
}

export default ProfileImage;