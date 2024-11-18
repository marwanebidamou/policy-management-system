import { createContext, ReactNode, useContext, useState } from "react"


// shape of global context
interface GlobalContextType {
    user: UserType,
    ui: UiProps,
    login: Function,
    logout: Function,
    isAuthenticated: Function
}

interface UserType {
    id: string,
    username: string,
    token: string
}

interface UiProps {
    heading: string
}

const initialUserData: UserType = {
    id: '',
    username: '',
    token: ''
}



//define global context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);


//define globab context provide
export function GlobalContextProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState(initialUserData);

    const login = (id: string, username: string, token: string) => {
        setState({ id, username, token });
        localStorage.setItem('userId', id);
        localStorage.setItem('userName', username);
        localStorage.setItem('token', token);
    }

    const logout = () => {
        setState(initialUserData);
        localStorage.setItem('userId', '');
        localStorage.setItem('userName', '');
        localStorage.setItem('token', '');
    }

    const isAuthenticated = () => {
        return state.username ? true : false;
    }

    return (
        <GlobalContext.Provider value={{
            user: initialUserData,
            ui: { heading: 'Policies' },
            isAuthenticated,
            login,
            logout
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

//hook for consuming the context
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('GlobalContext must be used within a GlobalContextProvider');
    }
    return context;
}