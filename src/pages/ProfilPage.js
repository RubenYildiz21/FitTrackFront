import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import height from '../assets/images/height.png';
import weight from '../assets/images/dumbbell.png';
import sablier from '../assets/images/sablier.png';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import Navbar from "./shared/Navbar"; 
import apiRequest from '../services/api';

const ProfilPage = () => {
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userString = sessionStorage.getItem('user');
                if (userString) {
                    const user = JSON.parse(userString);
                    setUser(user);
                    setUserId(user.id);

                    // Maintenant que nous avons userId, nous pouvons appeler les autres fonctions
                    await fetchFollowersCount(user.id);
                    await fetchFollowingCount(user.id);
                } else {
                    console.error("Aucun utilisateur trouvé dans sessionStorage");
                    setError("User not logged in.");
                }
                const user = JSON.parse(sessionStorage.getItem('user'));
                if (user) {
                    setUser(user);
                }
            } catch (error) {
                console.error("Error fetching user profile", error);
                setError("Could not fetch user profile.");
            }
        };

        const fetchFollowersCount = async (userId) => {
            try {
                const count = await apiRequest(`/follows/${userId}/followers/count`, 'GET');
                setFollowersCount(count); // Assurez-vous que le format de la réponse est correct
            } catch (error) {
                console.error("Error fetching followers count", error);
            }
        };

        const fetchFollowingCount = async (userId) => {
            try {
                const count = await apiRequest(`/follows/${userId}/following/count`, 'GET');
                setFollowingCount(count); // Assurez-vous que le format de la réponse est correct
            } catch (error) {
                console.error("Error fetching following count", error);
            }
        };

        // Appels des fonctions
        fetchUserProfile();
    }, [userId]);

    if (error) return <div className="text-red-500">{error}</div>;
    if (!user) return <div className="text-gray-500">Loading...</div>;


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white mb-20">
            <Navbar />

            {/* Header avec bouton retour */}
            <div className="max-w-3xl mx-auto px-4 py-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                    <span>Retour</span>
                </button>

                {/* Section profil */}
                <div className="mt-8 flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full ring-4 ring-gray-800 overflow-hidden">
                        <img
                            src={user.profilePicture || require('../assets/images/profile.png')}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h1 className="mt-4 text-2xl font-bold">
                        {user.firstName} {user.lastName}
                    </h1>

                    {/* Stats */}
                    <div className="flex gap-12 mt-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold">{followersCount}</p>
                            <p className="text-sm text-gray-400">Followers</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">{followingCount}</p>
                            <p className="text-sm text-gray-400">Following</p>
                        </div>
                    </div>
                </div>

                {/* Cartes d'informations */}
                <div className="mt-12 grid grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center">
                        <img src={height} alt="Height" className="w-10 h-10 mb-3" />
                        <span className="text-xl font-bold">{user.height}</span>
                        <span className="text-sm text-gray-400">CM</span>
                    </div>

                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center">
                        <img src={weight} alt="Weight" className="w-10 h-10 mb-3" />
                        <span className="text-xl font-bold">{user.weight}</span>
                        <span className="text-sm text-gray-400">KG</span>
                    </div>

                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center">
                        <img src={sablier} alt="Age" className="w-10 h-10 mb-3" />
                        <span className="text-xl font-bold">{user.age}</span>
                        <span className="text-sm text-gray-400">ANS</span>
                    </div>
                </div>

                {/* Objectifs */}
                <div className="mt-12 space-y-8">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
                        <h2 className="text-lg font-medium mb-2">Objectif principal</h2>
                        <p className="text-orange-400">{user.mainGoal}</p>
                    </div>

                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
                        <h2 className="text-lg font-medium mb-4">Objectif de poids</h2>
                        <div className="flex items-center gap-4">
                            <img src={weight} alt="Goal Weight" className="w-8 h-8" />
                            <span className="text-xl font-bold">{user.goalWeight} KG</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-12 space-y-3">
                    <button
                        onClick={() => navigate('/EditGoals')}
                        className="w-full py-3.5 rounded-xl bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 transition-colors"
                    >
                        Modifier les objectifs
                    </button>

                    <button
                        onClick={() => navigate('/EditProfile')}
                        className="w-full py-3.5 rounded-xl bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 transition-colors"
                    >
                        Modifier le profil
                    </button>

                    <button
                        onClick={() => {
                            sessionStorage.clear();
                            navigate('/');
                        }}
                        className="w-full py-3.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                    >
                        Déconnexion
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilPage;
