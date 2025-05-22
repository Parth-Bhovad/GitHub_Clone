import { TreeView } from "@primer/react";
import { useParams } from "react-router-dom";

//custom hooks
import { useRepoContext } from "../../features/repository/context/useRepoContext";

export default function FolderTreeView() { // ✅ Accept onFileSelect as a prop
  const { reponame } = useParams();
  console.log(reponame);

  const { repo, folderStructure } = useRepoContext();
  const { renderTree } = repo;
  const { tree } = folderStructure
  console.log(tree);

  return <TreeView>{Object.keys(tree).length > 0 ? renderTree(tree) : <p>Loading...</p>}</TreeView>;
}
