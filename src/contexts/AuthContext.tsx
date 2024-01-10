import React, { createContext, useContext, ReactNode, useState } from 'react';

// Definir o formato do contexto
interface AuthContextProps {
    userKey: string | null;
    login: (userKey: string) => void;
    logout: () => void;
}

// Inicializar o contexto com um valor padrão
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Criar um provedor para envolver a aplicação
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userKey, setUserKey] = useState<string | null>(null);

    // Adicionar as funções necessárias, como login e logout
    const login = (newUserKey: string) => {
        setUserKey(newUserKey);
    };

    const logout = () => {
        setUserKey(null);
    };

    return (
        <AuthContext.Provider value={{ userKey, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Criar um hook personalizado para utilizar o contexto
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
    }

    return context;
};