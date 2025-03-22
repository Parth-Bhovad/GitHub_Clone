import React from "react";
import ActionMenu from "../utils/ActionMenu";
import Label from '../utils/Label';
import Avatar from '../user/UserAvatar';
import "./RepoHeading.css";

const RepoHeading = () => {
    return (
        <div className="heading">
            <p><Avatar />RepoName  <Label /></p>
            <span>
                <ActionMenu />
                <ActionMenu />
                <ActionMenu />
            </span>
        </div>
    );
}

export default RepoHeading;