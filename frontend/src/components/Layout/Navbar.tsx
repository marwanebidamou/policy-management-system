import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const navigation = [
    { name: "Policies", href: "/policies" },
    { name: "Create Policy", href: "/create-policy" },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Header() {

    const { isAuthenticated, logout } = useGlobalContext();
    const location = useLocation();
    useEffect(() => {
        console.log(location);
    })
    return (
        <Disclosure as="nav" className="bg-gray-800 fixed min-w-full">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile Menu Button */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6" />
                        </DisclosureButton>
                    </div>

                    {/* Logo */}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <img
                                alt="Your Company"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                className="h-8 w-auto"
                            />
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        aria-current={item.href == location.pathname ? "page" : undefined}
                                        className={classNames(
                                            item.href == location.pathname
                                                ? "bg-gray-900 text-white"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Buttons */}
                    <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {!isAuthenticated() &&
                            <>
                                <Link
                                    to="/login"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    Signup
                                </Link>
                            </>
                        }

                        {isAuthenticated() &&
                            <>
                                <button
                                    onClick={() => logout()}
                                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    Logout
                                </button>
                            </>
                        }

                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.href == location.pathname ? "page" : undefined}
                            className={classNames(
                                item.href == location.pathname
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium"
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>

                {/* Mobile Buttons */}
                <div className="flex space-x-2 px-3 py-2">
                    {!isAuthenticated() &&
                        <>
                            <Link
                                to="/login"
                                className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="w-full rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                Signup
                            </Link>
                        </>
                    }

                    {isAuthenticated() &&
                        <>
                            <button
                                onClick={() => logout()}
                                className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                Logout
                            </button>
                        </>
                    }


                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
