import React, { createContext, useContext, useState, ReactNode } from 'react';
import jwt_decode from 'jwt-decode';

export interface AuthContextType {
    user: { 
        id: string;
        username: string;
    } | null;
    login: (username: string) => void;
    logout: () => void;
    saveUserId: (id: string) => void; // Nuevo método para guardar el ID del usuario
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<{ id: string; username: string } | null>(null);

    const login = (username: string) => setUser({ id: '', username });
    const logout = () => setUser(null);

    // Nuevo método para guardar el ID del usuario
    const saveUserId = (id: string) => {
        setUser(prevUser => prevUser ? { ...prevUser, id: id } : null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, saveUserId }}>
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
