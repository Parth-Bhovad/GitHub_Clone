import { useState } from "react";

function useRepoFormState() {
  const [reponame, setRepoName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(false);

  return { reponame, setRepoName, description, setDescription, visibility, setVisibility };
}

export default useRepoFormState;
