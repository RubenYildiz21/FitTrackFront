import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate(); // Hook to handle navigation

    // Handler function to redirect
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div
        className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-black border border-orange-500 rounded-full bottom-4 left-1/2 dark:bg-gray-900 dark:border-orange-500">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                <button
                    onClick={() => handleNavigation('/create-post')}
                    data-tooltip-target="tooltip-home" type="button"
                    className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-800 group">
                    <svg
                        className="w-5 h-5 mb-1 text-gray-400 group-hover:text-orange-500"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                    </svg>
                    <span className="sr-only">Home</span>
                </button>
                <button
                    onClick={() => handleNavigation('/NotFound')}
                    data-tooltip-target="tooltip-wallet" type="button"
                    className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800 group">
                    <svg
                        className="w-5 h-5 mb-1 text-gray-400 group-hover:text-orange-500"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/>
                    </svg>
                    <span className="sr-only">Wallet</span>
                </button>
                <div className="flex items-center justify-center">
                    <button
                        onClick={() => handleNavigation('/WorkoutForm')}
                        data-tooltip-target="tooltip-new" type="button"
                        className="inline-flex items-center justify-center w-10 h-10 font-medium bg-orange-500 rounded-full hover:bg-orange-600 group focus:ring-4 focus:ring-orange-700 focus:outline-none">
                        <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/>
                        </svg>
                        <span className="sr-only">New item</span>
                    </button>
                </div>
                <button
                    onClick={() => handleNavigation('/Challenge')}
                    data-tooltip-target="tooltip-settings" type="button"
                    className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800 group">
                    <svg
                        className="w-5 h-5 mb-1 text-gray-400 group-hover:text-orange-500"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"/>
                    </svg>
                    <span className=" sr-only">Challenge</span>
                </button>
                <button
                    onClick={() => handleNavigation('/Profil')}
                    data-tooltip-target="tooltip-profile" type="button"
                        className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-800 group">
                    <svg
                        className="w-5 h-5 mb-1 text-gray-400 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-500"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                    </svg>
                    <span className="sr-only">Profile</span>
                </button>
            </div>
        </div>
    );
};

export default Navbar;