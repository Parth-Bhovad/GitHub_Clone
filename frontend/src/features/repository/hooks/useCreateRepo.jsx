import { useNavigate } from "react-router-dom";
import { createRepo } from "../api/createRepoAPI";

function useCreateRepo() {
  const navigate = useNavigate();

  const handleUpload = async ( reponame, description, visibility, userId, username ) => {
      console.log(userId);
    try {
        
      await createRepo(reponame, description, visibility, userId, username);
      navigate("/");
    } catch (error) {
      console.log("Error during repo creation:", error.message);
    }
  };

  return { handleUpload };
}

export default useCreateRepo;