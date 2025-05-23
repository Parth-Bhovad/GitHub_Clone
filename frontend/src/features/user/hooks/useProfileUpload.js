import { useState } from "react";

//importing APIs
import {uploadProfilePic} from "../api/userAPI"

function useProfileUpload(username) {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        if (!file) {
            console.log("Please select a file.");
            return;
        }
        console.log("Uploading file:", file);
        const formData = new FormData();
        formData.append("profileUrl", file);

        try {
            await uploadProfilePic(username, formData);
        } catch (error) {
            console.error("Upload failed", error);
        }
    };
    return { handleUpload, setFile };
}

export default useProfileUpload;