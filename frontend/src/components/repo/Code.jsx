import React, { useEffect, useState } from 'react'
import "../../styles/components/code.css"
import axios from 'axios'

import Hr from "../utils/Hr"
import ActionMenu from "../utils/ActionMenu"
import BranchName from '../utils/BranchName';
import RepoTable from "../utils/RepoTable";
import Blankslate from "../utils/BlankSlate";
import RepoHeading from './RepoHeading';
export default function Code({reponame, username}) {
const [tree, setTree] = useState({});
    useEffect(() => {
        const getBucketFilePaths = async () => {
            try {
              let response = await axios.get(`https://github-server-4yd9.onrender.com/repo/allFilesPath/${reponame}`,
                { withCredentials: true }
              );
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
    }, [])

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
                        <RepoTable rows={tree} reponame={reponame} username={username}></RepoTable>
                    </div>

                    <Blankslate />
                </div>
            </div>
        </>
    );
}