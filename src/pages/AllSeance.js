// src/pages/AllSeance.js
import React, { useState, useEffect } from 'react';
import Navbar from "./shared/Navbar";
import apiRequest from '../services/api';
import { useNavigate } from 'react-router-dom';

const AllSeance = () => {
    const navigate = useNavigate();
    const [seances, setSeances] = useState([]);
    const [error, setError] = useState(null);
    
    // On va stocker l'utilisateur dans un state stable, une seule fois.
    const [userState, setUserState] = useState(null);

    // Récupération de l'utilisateur connecté une seule fois au montage
    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserState(parsedUser);
        }
    }, []);

    useEffect(() => {
        // On vérifie que userState est bien défini
        if (!userState || !userState.id) return;

        const fetchSeances = async () => {
            try {
                const data = await apiRequest(`/seances/user/${userState.id}`, 'GET');
                setSeances(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des séances", error);
                setError("Impossible de récupérer les séances.");
            }
        };

        fetchSeances();
    }, [userState]);

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white">
                <Navbar />
                <div className="max-w-3xl mx-auto px-4 py-6">
                    <h2 className="text-2xl font-semibold mb-8">Mes séances</h2>
                    <div className="text-red-500">{error}</div>
                </div>
            </div>
        );
    }

    if (!seances || seances.length === 0) {
        return (
            <div className="min-h-screen bg-black text-white">
                <Navbar />
                <div className="max-w-3xl mx-auto px-4 py-6">
                    <h2 className="text-2xl font-semibold mb-8">Mes séances</h2>
                    <div>Aucune séance trouvée.</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white mb-20">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-6">
                <h2 className="text-2xl font-semibold mb-8">Mes séances</h2>
                <div className="space-y-4">
                    {seances.map(seance => (
                        <div
                            key={seance.idSeance}
                            className="bg-gray-900 rounded-xl p-4 flex items-center justify-between"
                        >
                            <div>
                                
                                <h3 className="text-xl font-medium">{seance.nameSeance}</h3>
                                <p className="text-sm text-gray-400">
                                    {new Date(seance.dateSeance).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                            <button
                                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
                                onClick={() => navigate(`/seance/${seance.idSeance}`)}
                            >
                                Détails
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllSeance;
