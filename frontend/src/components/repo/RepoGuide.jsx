import React from "react";
import RepoHeading from "./RepoHeading";
import "./RepoGuide.css"
const RepoGuide = () => {
    <>
        <RepoHeading/>
        <div className="setup">
            <h3>Quick setup-- create a new repository on the command line</h3>
            <div className="guide">
                <span>node index.js init</span>
                <span>node index.js add</span>
                <span>node index.js commit {"<message>"}</span>
                <span>node index.js push</span>
                <span>node index.js remote add origin {"<link>"}</span>
                <span>node index.js push</span>
            </div>
        </div>
    </>
}