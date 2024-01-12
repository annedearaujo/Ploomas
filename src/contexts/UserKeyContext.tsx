import Cookies from 'js-cookie';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserKeyContextProps {
    userKey: string;
    setUserKey: React.Dispatch<React.SetStateAction<string>>;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserKeyContext = createContext<UserKeyContextProps | undefined>(undefined);

interface UserKeyProviderProps {
    children: ReactNode;
}

export const UserKeyProvider: React.FC<UserKeyProviderProps> = ({ children }) => {
    const [userKey, setUserKey] = useState<string>(Cookies.get('user-key') ?? '');
    const [openModal, setOpenModal] = useState<boolean>(false);

    const contextValue = { userKey, setUserKey, openModal, setOpenModal };

    return (
        <UserKeyContext.Provider value={contextValue}>
            {children}
        </UserKeyContext.Provider>
    );
};

export const useUserKey = () => {
    const context = useContext(UserKeyContext);

    if (!context) {
        throw new Error('useUserKey deve ser usado dentro de um UserKeyProvider');
    }

    return context;
};