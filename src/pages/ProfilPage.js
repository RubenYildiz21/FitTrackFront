import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRulerVertical } from 'react-icons/fa';  // Une règle verticale pour la taille
import { IoScaleOutline } from 'react-icons/io5';  // Une balance moderne pour le poids
import { FaBirthdayCake } from 'react-icons/fa';  // Un gâteau d'anniversaire pour l'âge
import Navbar from "./shared/Navbar"; 
import apiRequest from '../services/api';

const ProfilPage = () => {
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [profilePicture, setProfilePicture] = useState('');
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
                //setError("Could not fetch followers count.");
            }
        };

        const fetchFollowingCount = async (userId) => {
            try {
                const count = await apiRequest(`/follows/${userId}/following/count`, 'GET');
                setFollowingCount(count); // Assurez-vous que le format de la réponse est correct
            } catch (error) {
                console.error("Error fetching following count", error);
                //setError("Could not fetch following count.");
            }
        };

        // Appels des fonctions
        fetchUserProfile();
    }, [userId]);

    if (error) return <div className="text-red-500">{error}</div>;
    if (!user) return <div className="text-gray-500">Loading...</div>;

    const getProfilePicturePath = (base64String) => {
        try {
            return `data:image/jpeg;base64,${base64String}`;
            //return require(`../assets/images/${atob(base64String.replace(/^\.\/|=+$/g, ''))}`);
        } catch (e) {
            console.error("Failed to decode Base64 profile picture string", e);
            return '/src/assets/images/profile.png'; // Default path
        }
    };

    return (
        <div className="bg-black text-white min-h-screen p-6 mb-10">
            <Navbar/>
            <button
                className="text-gray-400 hover:text-white mb-4 text-2xl p-2"
                onClick={() => navigate(-1)}
            >
                &#8592; {/* Flèche gauche */}
            </button>
            <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img
                        src={user.profilePicture ? getProfilePicturePath(user.profilePicture) : require('../assets/images/profile.png')}
                        //src={require('../assets/images/profile.png')}
                        alt="Photo de profil"
                        className="object-cover w-full h-full"
                    />
                </div>
                <h1 className="text-2xl font-bold text-center mb-2">
                    {user.firstName} {user.lastName}
                </h1>
                <div className="flex items-center justify-between w-full mt-2">
                    <span className="text-lg">{followersCount} Followers</span>
                    <span className="text-lg">{followingCount} Follows</span>
                </div>
            </div>
            <div className="flex justify-center space-x-4 mb-4">
                <div className="flex justify-center space-x-4 mb-4 items-center">
                    <div className="flex flex-col items-center bg-red-500 p-2 rounded">
                        <FaRulerVertical className="w-10 h-10" />
                    </div>
                    <div className="text-center">
                        <span className="font-semibold">{user.height} CM</span>
                        <p className="text-center text-sm">Height</p>
                    </div>
                </div>
                <div className="flex justify-center space-x-4 mb-4 items-center">
                    <div className="flex flex-col items-center bg-blue-500 p-2 rounded">
                        <IoScaleOutline className="w-10 h-10" />
                    </div>
                    <div className="text-center">
                        <span className="font-semibold">{user.weight} KG</span>
                        <p className="text-center text-sm">Weight</p>
                    </div>
                </div>
                <div className="flex justify-center space-x-4 mb-4 items-center">
                    <div className="flex flex-col items-center bg-amber-300 p-2 rounded">
                        <FaBirthdayCake className="w-10 h-10" />
                    </div>
                    <div className="text-center">
                        <span className="font-semibold">{user.age} Year</span>
                        <p className="text-center text-sm">Age</p>
                    </div>
                </div>
            </div>
            <hr className="border-white mb-4"/>
            <div className="flex flex-col justify-center items-center mb-4">
                <h2 className="font-bold text-2xl">Main goal</h2>
                <span className="italic">{user.mainGoal}</span>
            </div>
            <div className="flex flex-col justify-center items-center mb-4">
                <h2 className="font-bold text-2xl">Personnal goals</h2>
                <div className="flex justify-center space-x-4 mb-4 items-center">
                    <div className="flex flex-col items-center bg-blue-500 p-2 rounded">
                        <IoScaleOutline className="w-10 h-10" />
                    </div>
                    <div className="text-center">
                        <span className="font-semibold">{user.goalWeight} KG</span>
                        <p className="text-center text-sm">Goal Weight</p>
                    </div>
                </div>
            </div>
            <hr className="border-white mb-4"/>
            <div className="flex flex-col space-y-4">
                <button className="bg-orange-500 hover:bg-orange-400 py-2 rounded"
                    onClick={() => navigate('/EditGoals')}
                >
                    Edit Goals
                </button>
                <button className="bg-orange-500 hover:bg-orange-400 py-2 rounded"
                    onClick={() => navigate('/EditProfile')}
                >
                    Edit Info
                </button>
                <button
                    className="bg-red-500 hover:bg-orange-400 py-2 rounded"
                    onClick={() => {
                        sessionStorage.clear(); // Clear session storage
                        localStorage.clear();
                        navigate('/LoginPage'); // Redirect to the homepage
                    }}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default ProfilPage;