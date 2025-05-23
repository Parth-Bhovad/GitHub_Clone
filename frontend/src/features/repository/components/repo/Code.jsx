import { useParams } from "react-router-dom";

import "../../styles/code.css"

import Hr from "../../../../components/common/Hr"
import ActionMenu from "../../../../components/common/ActionMenu"
import BranchName from '../../../../components/common/BranchName';
import RepoTable from "./RepoTable";
import Blankslate from "../../../../components/common/BlankSlate";
import RepoHeading from './RepoHeading';


export default function Code() {

  const { reponame, username } = useParams();

  return (
    <>
      <div className="code-container">
        <RepoHeading reponame={reponame} />
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
            <RepoTable reponame={reponame} username={username}></RepoTable>
          </div>

          <Blankslate />
        </div>
      </div>
    </>
  );
}