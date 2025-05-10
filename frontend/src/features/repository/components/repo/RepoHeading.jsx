import React from "react";
import ActionMenu from "../../../../components/common/ActionMenu";
import Label from '../../../../components/common/Label';
import Avatar from '../../../../components/common/UserAvatar';
import "../../styles/repoHeading.css";

const RepoHeading = ({reponame}) => {
    return (
        <div className="heading">
            <p><Avatar />{reponame}  <Label /></p>
            <span>
                <ActionMenu />
                <ActionMenu />
                <ActionMenu />
            </span>
        </div>
    );
}

export default RepoHeading;