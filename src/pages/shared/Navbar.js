//import { text } from 'framer-motion/client';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate(); // Hook to handle navigation
    const location = useLocation(); // Hook to get current location

    // Handler function to redirect
    const handleNavigation = (path, item) => {
        navigate(path);
    };


    const menuItems = [
        {
            name: 'Home',
            path: '/MenuPage',
            tooltip: 'tooltip-home',
            icon: (
                <svg
                    className="w-5 h-5 mb-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
                    />
                </svg>
            ),
        },
        {
            name: 'Progress',
            path: '/progress',
            tooltip: 'tooltip-wallet',
            icon: (
                <svg
                    className="w-5 h-5 mb-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                    />
                </svg>
            ),
        },
        {
            name: 'WorkoutForm',
            path: '/WorkoutForm',
            tooltip: 'tooltip-new',
            icon: (
                <svg
                    className="w-4 h-4 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                    />
                </svg>
            ),
            isCentral: true, // Indicateur pour le bouton central
        },
        {
            name: 'Challenges',
            path: '/Challenges',
            tooltip: 'tooltip-settings',
            icon: (
                <svg
                    className="w-5 h-5 mb-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
                    />
                </svg>
            ),
        },
        {
            name: 'Profile',
            path: '/Profil',
            tooltip: 'tooltip-profile',
            icon: (
                <svg
                    className="w-5 h-5 mb-1 text-gray-400 group-hover:text-orange-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
                    />
                </svg>
            ),
        },
    ];


    return (
        <div
            className="fixed z-50 w-11/12 h-16 border bg-gray-800 rounded-full bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleNavigation(item.path)}
                        data-tooltip-target={item.tooltip} 
                        type="button"
                        className={`inline-flex flex-col items-center justify-center px-5 rounded-full hover:bg-gray-700 group ${
                            location.pathname === item.path ? 'bg-gray-700 text-orange-500' : ''
                        }`}>
                        {item.isCentral ? (
                            item.icon
                        ) : (
                            React.cloneElement(item.icon, {
                                className: `w-5 h-5 mb-1 ${
                                location.pathname === item.path 
                                ? 'text-orange-500' : 'text-gray-400 group-hover:text-orange-500'
                                }`,
                            })
                        )}

                        <span className="sr-only">{item.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Navbar;