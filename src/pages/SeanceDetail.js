// src/pages/SeanceDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './shared/Navbar';
import apiRequest from '../services/api';

const SeanceDetail = () => {
    const { idSeance } = useParams();
    const navigate = useNavigate();
    const [seance, setSeance] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSeanceDetail = async () => {
            try {
                // Appel à l'API pour récupérer une séance spécifique par son ID
                const data = await apiRequest(`/seances/${idSeance}`, 'GET');
                setSeance(data);
            } catch (err) {
                console.error("Erreur lors de la récupération de la séance", err);
                setError("Impossible de récupérer la séance.");
            }
        };

        if (idSeance) {
            fetchSeanceDetail();
        }
    }, [idSeance]);

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white">
                <Navbar />
                <div className="max-w-3xl mx-auto px-4 py-6">
                    <h2 className="text-2xl font-semibold mb-8">Détails de la séance</h2>
                    <div className="text-red-500">{error}</div>
                </div>
            </div>
        );
    }

    if (!seance) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                Chargement des détails de la séance...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white mb-20">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-6">
                <h2 className="text-2xl font-semibold mb-8">Détails de la séance</h2>
                
                {/* Informations de la séance */}
                <div className="bg-gray-900 rounded-xl p-4 mb-6">
                    <h3 className="text-xl font-medium mb-2">{seance.nameSeance ? seance.nameSeance : "Séance sans nom"}</h3>
                    <p className="text-sm text-gray-400 mb-2">
                        Date : {new Date(seance.dateSeance).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>

                {/* Liste des blocs */}
                {seance.blocs && seance.blocs.length > 0 ? (
                    <div className="space-y-6">
                        {seance.blocs.map((bloc, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-xl">
                                <h4 className="text-lg font-semibold mb-2">Bloc {index + 1}</h4>
                                {bloc.exercice && (
                                    <div className="mb-2">
                                        <p className="text-md font-medium">Exercice : {bloc.exercice.nom}</p>
                                        
                                    </div>
                                )}

                                <div className="space-y-2">
                                    {bloc.series && bloc.series.length > 0 ? (
                                        bloc.series.map((serie, idx) => (
                                            <div 
                                                key={idx} 
                                                className="bg-gray-700 p-3 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center"
                                            >
                                                <div>
                                                    <p className="text-sm text-gray-200">Série N°{serie.serie}</p>
                                                    <p className="text-sm text-gray-200">Répétitions : {serie.reps}</p>
                                                    <p className="text-sm text-gray-200">Poids : {serie.poids} kg</p>
                                                </div>
                                                <div className="mt-2 sm:mt-0">
                                                    <p className="text-sm text-gray-400">Temps de repos : {serie.tempsRepos}</p>
                                                    <p className="text-sm text-gray-400">Temps de répétition : {serie.tempsDeRepetition}</p>
                                                    {/* {serie.caloriesBurned && (
                                                        <p className="text-sm text-gray-400">
                                                            Calories brûlées : {serie.caloriesBurned.toFixed(2)}
                                                        </p>
                                                    )} */}
                                                    {/* {serie.distance && serie.distance > 0 && (
                                                        <p className="text-sm text-gray-400">
                                                            Distance : {serie.distance.toFixed(2)} km
                                                        </p>
                                                    )} */}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400">Aucune série trouvée pour ce bloc.</p>
                                    )}
                                </div>
                                { (bloc.caloriesBurned && bloc.caloriesBurned > 0) || (bloc.distance && bloc.distance > 0) ? (
                                    <div className="mt-4 text-sm text-gray-300">
                                        {bloc.caloriesBurned > 0 && <p>Calories du bloc : {bloc.caloriesBurned.toFixed(2)}</p>}
                                        {bloc.distance > 0 && <p>Distance du bloc : {bloc.distance.toFixed(2)} km</p>}
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>Aucun bloc trouvé pour cette séance.</div>
                )}

                <div className="mt-6">
                    <button
                        className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
                        onClick={() => navigate("/AllSeance")}
                    >
                        Retour aux séances
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeanceDetail;
