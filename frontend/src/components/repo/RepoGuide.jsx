import React from "react";
import RepoHeading from "./RepoHeading";
import "./RepoGuide.css"
const RepoGuide = () => {
    return(
<>
        <RepoHeading/>
        <div className="setup">
            <h3>Quick setup-- create a new repository on the command line</h3>
            <div className="guide">
                <span>node index.js init</span>
                <br />
                <span>node index.js add</span>
                <br />
                <span>node index.js commit {"<message>"}</span>
                <br />
                <span>node index.js push</span>
                <br />
                <span>node index.js remote add origin {window.location.href}</span>
                <br />
                <span>node index.js push</span>
                <br />
            </div>
        </div>
    </>
    );
}

export default RepoGuide