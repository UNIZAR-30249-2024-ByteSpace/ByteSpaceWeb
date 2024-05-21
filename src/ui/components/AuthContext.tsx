/*  Laboratorio de Ingeniería del Software - Béjar Herández, Rubén
* Proyecto:             ByteSpace
* Fichero:              AuthContext.tsx
* Desarrolladores:             
*                       Ruiz Borao, Juan José - 756640            
*                       Clariana Pascual, Rael - 760617
*                       Pellicer Barco, Juan - 818138.
*/
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AuthContextType {
    user: { 
        id: string;
        username: string;
        rol: string; // Nuevo atributo para el rol del usuario
        departamento?: string; // Nuevo atributo para el rol del usuario
    } | null;
    login: (username: string) => void;
    logout: () => void;
    saveUserId: (id: string) => void; // Nuevo método para guardar el ID del usuario
    saveUserRol: (rol: string) => void; // Nuevo método para guardar el rol del usuario
    saveUserDepartamento: (departamento: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<{ id: string; username: string; rol: string; departamento: string;} | null>(null); // Incluye el rol del usuario

    const login = (username: string) => setUser({ id: '', username, rol: '', departamento: '' });
    const logout = () => setUser(null);

    // Nuevo método para guardar el ID del usuario
    const saveUserId = (id: string) => {
        setUser(prevUser => prevUser ? { ...prevUser, id: id } : null);
    };

    const saveUserRol = (rol: string) => {
        setUser(prevUser => prevUser ? { ...prevUser, rol: rol } : null);
    };

    const saveUserDepartamento = (departamento: string) => {
        setUser(prevUser => prevUser ? { ...prevUser, departamento: departamento } : null);
    };



    return (
        <AuthContext.Provider value={{ user, login, logout, saveUserId, saveUserRol, saveUserDepartamento }}>
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
