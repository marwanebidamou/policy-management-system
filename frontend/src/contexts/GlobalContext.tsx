import { createContext, ReactNode, useContext, useEffect, useState } from "react"


// shape of global context
interface GlobalContextType {
    user: UserType,
    uiConfig: UiProps,
    login: Function,
    logout: Function,
    isAuthenticated: Function,
    setUi: Function
}

interface UserType {
    username: string,
    token: string
}

interface UiProps {
    heading: string
}

const initialUserData: UserType = {
    username: '',
    token: ''
}



//define global context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);


//define globab context provide
export function GlobalContextProvider({ children }: { children: ReactNode }) {
    const [userState, setUserState] = useState(initialUserData);
    const [uiState, setUiState] = useState({ heading: '' });

    useEffect(() => {

        console.log("Globalcontext useEffect");
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');
        if (username && token) {
            setUserState({ username, token });
        }

    }, []);


    const login = (username: string, token: string) => {
        setUserState({ username, token });
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
    }

    const logout = () => {
        setUserState(initialUserData);
        localStorage.setItem('username', '');
        localStorage.setItem('token', '');
    }

    const isAuthenticated = () => {
        return userState.username ? true : false;
    }



    return (
        <GlobalContext.Provider value={{
            user: initialUserData,
            uiConfig: uiState,
            isAuthenticated,
            login,
            logout,
            setUi: setUiState
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