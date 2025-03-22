import React, { useState } from "react";
import { UnderlineNav } from '@primer/react'

//Importing components
import Navbar from "../Navbar";
import Code from "./Code";
import Issue from "./Issue"

export default function ShowRepo() {
    const [activeTab, setActiveTab] = useState("Code");

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
            <div>
                {activeTab === "Code" && <Code />}
                {activeTab === "Issue" && <Issue />}
            </div>
        </>
    );
}
