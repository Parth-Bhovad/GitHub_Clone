import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { TreeView } from "@primer/react";

// Importing utility functions
import { buildHierarchy } from "../utils/buildHierarchy";

// importing APIs
import { fetchBucketFilePaths, fetchFileExtension, fetchPublicUrl } from "../api/repoAPI";

//Prism.js imports
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Choose your theme
import 'prismjs/components/prism-javascript'; // Support JS highlighting
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup'; // For HTML
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';

import { FileIcon, FileDirectoryIcon } from "@primer/octicons-react"; // GitHub icons

function useRepo() {
    const { reponame } = useParams();

    const [tree, setTree] = useState({});
    const [fileContent, setFileContent] = useState("Select a file to view its content.");
    const [extension, setExtension] = useState("");
    const [expandedNodes, setExpandedNodes] = useState(new Set());

    useEffect(() => {
        if (reponame) {
            console.log("getFolderStructure");

            const getFolderStructure = async () => {
                let links = await fetchBucketFilePaths(reponame);
                console.log(links);

                let result = buildHierarchy(links);
                console.log(result);

                setTree(result);
            };
            getFolderStructure();
        }
    }, []);

    useEffect(() => {
        // Highlight the code after the component mounts or updates
        Prism.highlightAll();
    }, [fileContent]); // Dependency array to re-run on fileContent change

    const fetchFileContent = async (filePath) => {
        console.log("📂 File selected:", filePath);

        try {
            const cleanedPath = filePath.startsWith("/") ? filePath.slice(1) : filePath;

            console.log("🔹 Cleaned Path:", cleanedPath);

            // Fetch file extension from the cleaned path
            const fileExtensionResponse = await fetchFileExtension(cleanedPath);

            setExtension(fileExtensionResponse);
            console.log("File Extension:", fileExtensionResponse);

            const publicUrl = await fetchPublicUrl(cleanedPath);

            // ✅ Fetch file from public URL (no encoding needed)
            const response = await fetch(publicUrl);
            console.log(response);

            if (!response.ok) {
                throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
            }

            const text = await response.text();
            console.log("✅ File content loaded.");
            setFileContent(text);
        } catch (err) {
            console.error("❌ Error fetching file content:", err);
            setFileContent("Failed to load file.");
        }
    };

    const toggleNode = (id) => {
        setExpandedNodes((prev) => {
            const newSet = new Set(prev);
            newSet.has(id) ? newSet.delete(id) : newSet.add(id);
            return newSet;
        });
    };

    const handleFileClick = (filePath) => {
        console.log("✅ File Clicked:", filePath); // ✅ Debugging log
        if (fetchFileContent) {
            fetchFileContent(filePath);
        } else {
            console.error("❌ onFileSelect is not defined!");
        }
    };

    const renderTree = (node, parentPath = "") => {
        console.log("renderTree");

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

    return ({ tree, fetchFileContent, extension, fileContent, renderTree });
}

export default useRepo;