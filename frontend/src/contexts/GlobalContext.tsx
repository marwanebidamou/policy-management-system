import { createContext, ReactNode, useContext, useEffect, useState } from "react"


// shape of global context
interface GlobalContextType {
    user: UserType,
    uiConfig: UiProps,
    login: Function,
    logout: Function,
    isAuthenticated: Function,
    setUi: Function,
    addNotification: (message: string, type: "success" | "error" | "info") => void
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

type Notification = {
    id: string;
    message: string;
    type: "success" | "error" | "info";
};






//define global context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);


//define globab context provide
export function GlobalContextProvider({ children }: { children: ReactNode }) {
    const [userState, setUserState] = useState(initialUserData);
    const [uiState, setUiState] = useState({ heading: '' });
    const [notifications, setNotifications] = useState<Notification[]>([]);

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

    const addNotification = (message: string, type: "success" | "error" | "info") => {
        const id = Math.random().toString(36).substr(2, 9);
        setNotifications((prev) => [...prev, { id, message, type }]);

        // Auto-remove notification after 3 seconds
        setTimeout(() => {
            setNotifications((prev) => prev.filter((notif) => notif.id !== id));
        }, 3000);
    };



    return (
        <GlobalContext.Provider value={{
            user: initialUserData,
            uiConfig: uiState,
            isAuthenticated,
            login,
            logout,
            setUi: setUiState,
            addNotification
        }}>
            {children}
            {/* Notification Overlay */}
            <div className="fixed top-20 right-5 space-y-4 z-50">
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className={`flex items-center px-4 py-3 rounded shadow bg-opacity-90 ${notif.type === "success"
                            ? "bg-green-600 text-white"
                            : notif.type === "error"
                                ? "bg-red-600 text-white"
                                : "bg-blue-600 text-white"
                            }`}
                    >
                        <p className="text-sm">{notif.message}</p>
                    </div>
                ))}
            </div>
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