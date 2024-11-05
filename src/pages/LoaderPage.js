// src/pages/LoaderPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoaderPage = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prevProgress + 1;
            });
        }, 30);

        const redirectTimeout = setTimeout(() => {
            navigate('/LoginPage');
        }, 3000);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(redirectTimeout);
        };
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <h2 className="text-3xl font-semibold mb-4">Inscription terminée !</h2>
            <p className="mb-8 text-lg">Redirection vers la page de connexion...</p>
            <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-orange-500 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="mt-4 text-lg font-medium">{progress}%</p>
        </div>
    );
};

export default LoaderPage;
