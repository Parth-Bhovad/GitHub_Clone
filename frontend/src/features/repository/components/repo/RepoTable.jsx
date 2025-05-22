import Avatar from '../../../../components/common/UserAvatar';
import "../../styles/repoTable.css"
// import "../../assets/colors.css";
import { Link } from "react-router-dom";

//importing context
import { useRepoContext } from '../../context/useRepoContext';

export default function RepositoryTable({reponame, username}) {

    const {folderStructure} = useRepoContext();
    const {tree} = folderStructure;
    const rows = tree;
    return (
        <div className="table">
            <div className="top">
                <Avatar />{username}
            </div>
            {Object.keys(rows).map((key) => (
                <Link to={`/${username}/${reponame}/show`}>
                <div className="row">
                    <span>{key}</span>
                    <span>Recent Commit</span>
                    <span>Time</span>
                </div>
            </Link>
            ))}
        </div>
    );
}
