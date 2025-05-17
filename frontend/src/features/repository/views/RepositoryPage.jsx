import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

//importing custom hooks
import useRepoAuth from '../hooks/useRepoAuth';

//importing context
import { useAuthContext } from "../../user/context/authContext"

// importing components
import Repository from "../components/repo/Repository"

function RepositoryPage() {
    const { repository } = useRepoAuth();
    const { currentUser } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (repository.visibility === false) {
            if (repository.owner != currentUser) {
                navigate("/");
            }
        }
    }, [repository]);
    return (
        <Repository />
    );
}

export default RepositoryPage;