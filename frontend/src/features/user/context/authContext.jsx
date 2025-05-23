import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

const initCurrentUser = () => {
    const userId = localStorage.getItem("userId");
    return userId ? userId : null;
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(initCurrentUser);
    const value = {
        currentUser, setCurrentUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};