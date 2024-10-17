// src/pages/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/images/bannerhubmusculation-64109c1e8b4f3.jpg';
import logo from '../assets/images/logooo-removebg-preview.png';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    return (
        // Conteneur principal
        <div className="relative min-h-screen overflow-hidden">
            {/* Image de fond floue */}
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-md"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>

            {/* Superposition sombre */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Contenu de la page */}
            <div className="relative flex items-center justify-center min-h-screen">
                <div className="text-center px-6">
                    {/* Logo */}
                    <img
                        src={logo}
                        alt="Logo de FitTrack"
                        className="mx-auto w-65 h-65" // Remplacez mb-6 par mb-4 ou mb-2
                    />

                    {/* Titre */}
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Bienvenue sur <span className="text-orange-500">FitTrack</span>
                    </h1>

                    {/* Sous-titre */}
                    <p className="text-lg text-gray-300 mb-8">
                        Suivez votre programme d'entraînement et atteignez vos objectifs.
                    </p>

                    {/* Boutons */}
                    <div className="space-y-4">
                        <button
                            onClick={handleLoginClick}
                            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-200"
                        >
                            Se connecter
                        </button>
                        <button
                            onClick={handleSignupClick}
                            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-200"
                        >
                            S'inscrire
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;