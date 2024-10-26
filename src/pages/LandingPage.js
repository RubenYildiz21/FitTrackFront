import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/images/bannerhubmusculation-64109c1e8b4f3.jpg';
import logo from '../assets/images/logooo-removebg-preview.png';
import '../assets/styles/style.css';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/LoginPage');
    };

    const handleSignupClick = () => {
        navigate('/MultiStepForm');
    };

    return (
        // Main container
        <div className="relative flex items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-md animate-fadeIn"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>

            {/* Dark Overlay - Removed animation to prevent inconsistent opacity */}
            <div className="absolute inset-0 bg-black opacity-70"></div>

            {/* Content */}
            <div className="relative flex flex-col items-center justify-center text-center max-w-md p-10 animate-slideUp">
                {/* Logo */}
                <img
                    src={logo}
                    alt="Logo de FitTrack"
                    className="w-72 h-72 mb-6 animate-bounceSlow"
                />

                {/* Title */}
                <h1 className="text-4xl font-bold mb-4 animate-fadeInFast">
                    Bienvenue sur <span className="text-orange-500">FitTrack</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg text-gray-300 mb-8 animate-fadeIn">
                    Suivez votre programme d'entraînement et atteignez vos objectifs.
                </p>

                {/* Buttons */}
                <div className="space-y-4 w-full animate-fadeInSlow">
                    <button
                        onClick={handleLoginClick}
                        className="w-full py-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transform hover:scale-105 ease-out"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={handleSignupClick}
                        className="w-full py-4 bg-transparent border-2 border-orange-500 text-orange-500 font-semibold rounded-md hover:bg-orange-500 hover:text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transform hover:scale-105 ease-out"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;

