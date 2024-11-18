import { ReactNode } from "react";

interface MainProps {
    title: string; // The title to display in the header
    children?: ReactNode; // The content to render in the main section
}

function Main({ title, children }: MainProps) {
    return (
        <div className="mx-auto w-full lg:w-3/4 ">
            {/* px-2 sm:px-6 lg:px-8 */}
            {title && <header className="bg-white shadow">
                <div className="mx-auto  px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
                </div>
            </header>}
            <main className="mx-auto px-4 py-6 sm:px-6 lg:px-8 ">
                {children}
            </main>
        </div>
    );
}

export default Main;