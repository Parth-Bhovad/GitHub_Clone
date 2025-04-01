import React, { useEffect, useState } from "react";
import { TreeView } from "@primer/react";
import axios from "axios";
import { FileIcon, FileDirectoryIcon } from "@primer/octicons-react"; // GitHub icons

export default function FolderTreeView({ onFileSelect }) { // ✅ Accept onFileSelect as a prop
  const [tree, setTree] = useState({});
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  useEffect(() => {
    const getBucketFilePaths = async () => {
      try {
        let response = await axios.get("http://localhost:3000/repo/allFilesPath/repo1");
        return response.data;
      } catch (error) {
        console.error("Error fetching file paths:", error);
        return [];
      }
    };

    function buildHierarchy(paths) {
      let result = {};

      for (let path of paths) {
        let cleanPath = path.trim();
        let parts = cleanPath.split("\\");
        // parts.splice(0, 2); // Remove unnecessary parts
        let current = result;

        for (let part of parts) {
          if (!current[part]) {
            current[part] = {};
          }
          current = current[part];
        }
      }

      return result;
    }

    const getFolderStructure = async () => {
      let links = await getBucketFilePaths();
      let result = buildHierarchy(links);
      setTree(result);
    };

    getFolderStructure();
  }, []);

  const toggleNode = (id) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const handleFileClick = (filePath) => {
    console.log("✅ File Clicked:", filePath); // ✅ Debugging log
    if (onFileSelect) {
      onFileSelect(filePath);
    } else {
      console.error("❌ onFileSelect is not defined!");
    }
  };

  const renderTree = (node, parentPath = "") => {
    return Object.keys(node).map((key) => {
      const fullPath = parentPath ? `${parentPath}/${key}` : key;
      const children = Object.keys(node[key]).length > 0 ? renderTree(node[key], fullPath) : null;
      const isExpanded = expandedNodes.has(fullPath);

      return (
        <TreeView.Item key={fullPath} id={fullPath} expanded={isExpanded} onExpandedChange={() => toggleNode(fullPath)}>
          {/* ✅ Clickable Wrapper */}
          <div
            onClick={!children ? () => handleFileClick(fullPath) : undefined} 
            style={{ cursor: "pointer", padding: "5px" }} // 🔹 Make clickable
          >
            <TreeView.LeadingVisual>
              {children ? <FileDirectoryIcon /> : <FileIcon />}
            </TreeView.LeadingVisual>
            {key}
          </div>
          
          {children && <TreeView.SubTree>{children}</TreeView.SubTree>}
        </TreeView.Item>
      );
    });
  };

  return <TreeView>{Object.keys(tree).length > 0 ? renderTree(tree) : <p>Loading...</p>}</TreeView>;
}
