import { createContext, useState, useEffect, useContext } from 'react';

//importing custom hooks
import useRepo from '../hooks/useRepo';

const RepoContext = createContext();

export const useRepoContext = () => {
    return useContext(RepoContext);
}

export const RepoProvider = ({ children }) => {
    const repo = useRepo();
    return (
        <RepoContext.Provider value={repo} >
            {children}
        </ RepoContext.Provider>
    );
}