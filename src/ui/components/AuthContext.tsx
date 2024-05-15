import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AuthContextType {
    user: { 
        id: string;
        username: string;
        rol: string; // Nuevo atributo para el rol del usuario
    } | null;
    login: (username: string) => void;
    logout: () => void;
    saveUserId: (id: string) => void; // Nuevo método para guardar el ID del usuario
    saveUserRol: (rol: string) => void; // Nuevo método para guardar el rol del usuario
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<{ id: string; username: string; rol: string } | null>(null); // Incluye el rol del usuario

    const login = (username: string) => setUser({ id: '', username, rol: '' });
    const logout = () => setUser(null);

    // Nuevo método para guardar el ID del usuario
    const saveUserId = (id: string) => {
        setUser(prevUser => prevUser ? { ...prevUser, id: id } : null);
    };

    const saveUserRol = (rol: string) => {
        setUser(prevUser => prevUser ? { ...prevUser, rol: rol } : null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, saveUserId, saveUserRol }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
