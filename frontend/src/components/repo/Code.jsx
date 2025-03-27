import React from 'react'
import "./Code.css"

import Hr from "../utils/hr/Hr"
import ActionMenu from "../utils/ActionMenu"
import BranchName from '../utils/BranchName';
import RepoTable from "../utils/RepoTable";
import Blankslate from "../utils/BlankSlate";
import RepoHeading from './RepoHeading';
export default function Code({reponame}) {
    return (
        <>
            <div className="code-container">
                <RepoHeading reponame={reponame}/>
                <Hr />
                <div className="main">
                    <div className="d-1">
                        <span className='left-span'>
                            <ActionMenu />
                            <BranchName />
                        </span>
                        <span className='right-span'>
                            <input type="text" />
                            <ActionMenu />
                            <ActionMenu />
                        </span>
                    </div>
                    <div className="d-2">
                        <RepoTable></RepoTable>
                    </div>

                    <Blankslate />
                </div>
            </div>
        </>
    );
}