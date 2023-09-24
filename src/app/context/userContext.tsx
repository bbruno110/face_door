import { createContext, ReactNode, useContext, useState, useEffect  } from "react";
const STORAGE_KEY = 'loginContet';

export type usuario = {
    email: string,
    token?: string,
}

type AuthContextProps = {
    user: usuario | null;
    login: (user: usuario) => void;
    logout: () => void;
}

const initialState = {
    email: '',
    token: ''
}

const UserContext = createContext<AuthContextProps>({} as AuthContextProps);

const LoggedUserProvider = ({ children } : {children: ReactNode}) => {
    //const [user, setUser] = useState<usuario | null>(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
    
    const [user, setUser] = useState<usuario | null>(typeof window !== "undefined" ? 
        JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') : initialState
        );
        
    useEffect(()=>{
        if (user !== initialState) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        }
    },[user])

    const login = (user: usuario)=> {
        setUser(user);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
    const logout = () => {
        console.log('logout');
    }
    return (
        <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>
    );
}

const useAuth = () =>{
    const context = useContext(UserContext);
    return context;
}

export { LoggedUserProvider, useAuth, UserContext };