import React, { useEffect, useState } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import TreeView from "../utils/TreeView";
import "../../styles/components/showCode.css";
//importing axios instance
import api from '../../api/axios';

//Prism.js
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Choose your theme
import 'prismjs/components/prism-javascript'; // Support JS highlighting
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup'; // For HTML
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';


export default function ShowCode() {
    const [fileContent, setFileContent] = useState("Select a file to view its content.");
    const [extension, setExtension] = useState("");

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
            const fileExtensionResponse = await api.get("/repo/getFileExt", {
                params: { filePath: cleanedPath },
              });
              
            setExtension(fileExtensionResponse.data.extension);
            console.log("File Extension:", fileExtensionResponse.data.extension);

            const publicUrl = await api.get(`/repo/publicUrl/${cleanedPath}`)

            // ✅ Fetch file from public URL (no encoding needed)
            const response = await fetch(publicUrl.data);
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



    return (
        <Splitter style={{ height: '300px' }}>
            <SplitterPanel className="flex align-items-center justify-content-center split">
                <TreeView onFileSelect={fetchFileContent} />
            </SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center">
                <pre style={{ whiteSpace: "pre-wrap" }} className='line-numbers'><code className={`language-${extension}`}>{fileContent}</code></pre>
            </SplitterPanel>
        </Splitter>
    );
}