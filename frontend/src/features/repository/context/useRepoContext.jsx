import { createContext, useContext } from 'react';

//importing custom hooks
import useRepo from '../hooks/useRepo';
import useFolderStructure from '../hooks/useFolderStructure';

const RepoContext = createContext();

export const useRepoContext = () => {
    return useContext(RepoContext);
}

export const RepoProvider = ({ children }) => {
    const repo = useRepo();
    const folderStructure = useFolderStructure();
    const value={
        repo, folderStructure
    }
    return (
        <RepoContext.Provider value={value} >
            {children}
        </ RepoContext.Provider>
    );
}