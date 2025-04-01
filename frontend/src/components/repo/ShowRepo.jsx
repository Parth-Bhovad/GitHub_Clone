import React, { useState } from "react";
import { UnderlineNav } from '@primer/react'
import { useParams } from "react-router-dom";

//Importing components
import Navbar from "../Navbar";
import Code from "./Code";
import Issue from "./Issue"
import RepoGuide from "./RepoGuide";

export default function ShowRepo() {
    const [activeTab, setActiveTab] = useState("Code");
    const [isPush, setIsPush] = useState(true);

    let { reponame } = useParams();
    return (
        <>
            <Navbar />
            <UnderlineNav aria-label="Repository">
                <UnderlineNav.Item aria-current={activeTab === "Code" ? "page" : undefined} onClick={() => setActiveTab("Code")}>
                    Code
                </UnderlineNav.Item>
                <UnderlineNav.Item aria-current={activeTab === "Pull requests" ? "page" : undefined} onClick={() => setActiveTab("Pull requests")}>Pull requests</UnderlineNav.Item>
                <UnderlineNav.Item aria-current={activeTab === "Issue" ? "page" : undefined} onClick={() => setActiveTab("Issue")}>Issue</UnderlineNav.Item>
                <UnderlineNav.Item aria-current={activeTab === "Projects" ? "page" : undefined} onClick={() => setActiveTab("Projects")} >Projects</UnderlineNav.Item>
                <UnderlineNav.Item aria-current={activeTab === "Wiki" ? "page" : undefined} onClick={() => setActiveTab("Wiki")}>Wiki</UnderlineNav.Item>
            </UnderlineNav>

            {/*Render components*/}
            {isPush === true ?
                <div>
                    {activeTab === "Code" && <Code reponame={reponame} />}
                    {activeTab === "Issue" && <Issue />}
                </div>
                :
                <div><RepoGuide /></div>}
        </>
    );
}
