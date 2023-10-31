"use client"
import { createContext, ReactNode, useContext, useState, useEffect  } from "react";

const STORAGE_KEY = 'loginContet';

export type usuario = {
    id: number,
    nome?: string,
    email: string,
    token?: string,
    caminho?: string
}

export type usuarioCad = {
    id?: number,
    nome?: string,
    email?: string,
    token?: string,
    caminho?: string
}


type AuthContextProps = {
    user: usuario | null;
    login: (user: usuario) => void;
    logout: () => void;
    userFind: usuarioCad | null;
    FinderLogout : () => void;
    Finder: (userFind: usuarioCad) => void;
}

const initialState = {
    id: '',
    nome: '',
    email: '',
    token: '',
    caminho: ''
}

const UserContext = createContext<AuthContextProps>({} as AuthContextProps);

const LoggedUserProvider = ({ children } : {children: ReactNode}) => {
    const [isMounted, setIsMounted] = useState(false);
    //const [user, setUser] = useState<usuario | null>(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
    
    const [user, setUser] = useState<usuario | null>(typeof window !== "undefined" ? 
        JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') : initialState
        );
    const [userFind, setUserFind] = useState<usuarioCad | null>(typeof window !== "undefined" ? 
    JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') : initialState
    );

    const login = (user: usuario)=> {
        setUser(user);
    }
    const logout = () => {
        setUser(null);
        console.log('logout');
    }
    const FinderLogout = () => {
        setUserFind(null);
    }
    const Finder = (userFind: usuarioCad)=>{
        setUserFind(userFind)
    }

    useEffect(() => {
        setIsMounted(true);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
     }, [user]);
  
     if (!isMounted) {
        return null;
     }
  

    return (
        <UserContext.Provider value={{ user, login, logout, userFind, Finder, FinderLogout }}>{children}</UserContext.Provider>
    );
}

const useAuth = () =>{
    const context = useContext(UserContext);
    return context;
}

export { LoggedUserProvider, useAuth, UserContext };