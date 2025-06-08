import { useRef } from "react";

//importing components
import Hr from "../../../components/common/Hr";

//importing auth context
import { useAuthContext } from "../context/authContext";

function ProfileImage({ profileUrl, userDetailsId, setFile, handleUpload, file }) {
    const { currentUser } = useAuthContext();
    const fileInputRef = useRef(null);

    return (
        <>
            <div className="profile-image">
                {profileUrl ? <img src={profileUrl} alt="profile" /> : <p>No profileUrl</p>}
            </div>
            {String(currentUser) === String(userDetailsId) ?
                <div className="profile-image-upload">
                    <label htmlFor="profile"></label>
                    <input type="file" id="profile" name="profileUrl" ref={fileInputRef} onChange={(e) => setFile(e.target.files[0])} style={{ display: 'none' }} />
                    <button id="change-profile-image" onClick={() => fileInputRef.current.click()}>Change Profile Image</button>
                    <br />
                    {file && <button id="upload-profile-image" onClick={handleUpload}>Upload</button>}
                </div>
                :
                null}
                <Hr />

        </>
    );
}

export default ProfileImage;