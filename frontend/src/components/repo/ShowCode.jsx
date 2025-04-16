import React, { useState } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import TreeView from "../utils/TreeView";
import "../../styles/components/showCode.css";
import axios from 'axios';

export default function ShowCode() {
    const [fileContent, setFileContent] = useState("Select a file to view its content.");

    const fetchFileContent = async (filePath) => {
        console.log("📂 File selected:", filePath);

        try {
            const cleanedPath = filePath.startsWith("/") ? filePath.slice(1) : filePath;

            console.log("🔹 Cleaned Path:", cleanedPath);

            const publicUrl = await axios.get(`https://github-server-4yd9.onrender.com/repo/publicUrl/${cleanedPath}`)

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
                <pre style={{ whiteSpace: "pre-wrap" }}>{fileContent}</pre>
            </SplitterPanel>
        </Splitter>
    );
}