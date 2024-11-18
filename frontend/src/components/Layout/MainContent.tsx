import { ReactNode } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";

interface MainProps {
    children?: ReactNode; // The content to render in the main section
}

function Main({ children }: MainProps) {
    const { uiConfig } = useGlobalContext();

    return (
        <div className="mx-auto w-full lg:w-3/4 ">
            {/* px-2 sm:px-6 lg:px-8 */}
            {uiConfig.heading && <header className="bg-white shadow">
                <div className="mx-auto  px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{uiConfig.heading}</h1>
                </div>
            </header>}
            <main className="mx-auto px-4 py-6 sm:px-6 lg:px-8 ">
                {children}
            </main>
        </div>
    );
}

export default Main;