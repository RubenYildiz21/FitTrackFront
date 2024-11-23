import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import height from '../assets/images/height.png';
import weight from '../assets/images/dumbbell.png';
import sablier from '../assets/images/sablier.png';

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
        <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen p-6 pb-20 mb-10">
            <Navbar/>
            <button
                className="text-gray-400 hover:text-white mb-4 text-2xl p-2 transition duration-200"
                onClick={() => navigate(-1)}
            >
                &#8592; {/* Flèche gauche */}
            </button>

            {/* Profil Utilisateur */}
            <div className="flex flex-col items-center mb-8 bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
                <div className="w-28 h-28 rounded-full overflow-hidden">
                    <img
                        src={user.profilePicture ? user.profilePicture : require('../assets/images/profile.png')}
                        alt="Profile"
                        className="object-cover w-full h-full"
                    />
                </div>
                <h1 className="text-3xl font-bold">{user.firstName} {user.lastName}</h1>
                <div className="flex space-x-6 text-center mt-2">
                    <div>
                        <p className="text-lg font-semibold">{followersCount}</p>
                        <p className="text-sm text-gray-400">Followers</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">{followingCount}</p>
                        <p className="text-sm text-gray-400">Following</p>
                    </div>
                </div>
            </div>

            {/* Informations sur l'utilisateur */}
            <div className="flex flex-wrap justify-center gap-6 mb-6">
                <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md space-y-2">
                    <img src={height} alt="Height Icon" className="w-12 h-12" />
                    <span className="font-semibold">{user.height} CM</span>
                    <p className="text-sm text-gray-400">Height</p>
                </div>

                <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md space-y-2">
                    <img src={weight} alt="Weight Icon" className="w-12 h-12" />
                    <span className="font-semibold">{user.weight} KG</span>
                    <p className="text-sm text-gray-400">Weight</p>
                </div>

                <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md space-y-2">
                    <img src={sablier} alt="Age Icon" className="w-12 h-12" />
                    <span className="font-semibold">{user.age} Years</span>
                    <p className="text-sm text-gray-400">Age</p>
                </div>
            </div>

            <hr className="border-gray-600 mb-6" />

            {/* Objectifs */}
            <div className="text-center mb-6">
                <h2 className="font-bold text-2xl mb-4">Main Goal</h2>
                <span className="text-lg italic text-orange-400">{user.mainGoal}</span>
            </div>

            <div className="text-center mb-6">
                <h2 className="font-bold text-2xl mb-4">Personal Goals</h2>
                <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md space-y-2">
                    <img src={weight} alt="Goal Weight Icon" className="w-12 h-12" />
                    <span className="font-semibold">{user.goalWeight} KG</span>
                    <p className="text-sm text-gray-400">Goal Weight</p>
                </div>
            </div>

            <hr className="border-gray-600 mb-6" />

            {/* Boutons */}
            <div className="flex flex-col space-y-4">
                <button className="bg-orange-500 hover:bg-orange-600 py-3 rounded-md font-semibold shadow-md transition duration-300"
                onClick={() => navigate('/EditGoals')}>
                    Edit Goals
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 py-3 rounded-md font-semibold shadow-md transition duration-300"
                onClick={() => navigate('/EditProfile')}>
                    Edit Info
                </button>
                <button
                    className="bg-red-600 hover:bg-red-500 py-3 rounded-md font-semibold shadow-md transition duration-300"
                    onClick={() => {
                        sessionStorage.clear(); // Clear session storage
                        navigate('/'); // Redirect to the homepage
                    }}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default ProfilPage;
