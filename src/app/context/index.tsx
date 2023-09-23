import { LoggedUserProvider } from "./userContext"

export const AppProvider = ({ children }: { children: React.ReactNode }) =>{
    return <LoggedUserProvider>{children}</LoggedUserProvider> 
}