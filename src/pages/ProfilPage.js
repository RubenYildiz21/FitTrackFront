import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GoalsPage from './Goals';
import height from '../assets/images/height.png';
import weight from '../assets/images/dumbbell.png';
import sablier from '../assets/images/sablier.png';
import Navbar from "./shared/Navbar";

const ProfilPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [profilePicture, setProfilePicture] = useState('');
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/auth/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUser(data);
                setProfilePicture(require(`../assets/images/${data.profilePicture}`));
            } catch (error) {
                console.error("Error fetching user profile", error);
                setError("Could not fetch user profile.");
            }
        };

        const fetchFollowersCount = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/connection/followersCount/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFollowersCount(data); // Assurez-vous que le format de la réponse est correct
            } catch (error) {
                console.error("Error fetching followers count", error);
                //setError("Could not fetch followers count.");
            }
        };

        const fetchFollowingCount = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/connection/followingCount/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFollowingCount(data); // Assurez-vous que le format de la réponse est correct
            } catch (error) {
                console.error("Error fetching following count", error);
                //setError("Could not fetch following count.");
            }
        };

        // Appels des fonctions
        fetchUserProfile();
        fetchFollowersCount();
        fetchFollowingCount();
    }, [userId]);

    if (error) return <div className="text-red-500">{error}</div>;
    if (!user) return <div className="text-gray-500">Loading...</div>;

    return (
        <div className="bg-black text-white min-h-screen p-6">
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
                        src={profilePicture}
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
                        <img src={height} alt="Taille icon" className="w-10 h-10"/>
                    </div>
                    <div className="text-center">
                        <span className="font-semibold">{user.height} CM</span>
                        <p className="text-center text-sm">Height</p>
                    </div>
                </div>
                <div className="flex justify-center space-x-4 mb-4 items-center">
                    <div className="flex flex-col items-center bg-blue-500 p-2 rounded">
                        <img src={weight} alt="Poids icon" className="w-10 h-10"/>
                    </div>
                    <div className="text-center">
                        <span className="font-semibold">{user.weight} KG</span>
                        <p className="text-center text-sm">Weight</p>
                    </div>
                </div>
                <div className="flex justify-center space-x-4 mb-4 items-center">
                    <div className="flex flex-col items-center bg-amber-300 p-2 rounded">
                        <img src={sablier} alt="Poids icon" className="w-10 h-10"/>
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
                <span className="italic">{user.goalWeight} KG</span>
            </div>
            <hr className="border-white mb-4"/>
            <div className="flex flex-col space-y-4">
                <button className="bg-orange-500 hover:bg-orange-400 py-2 rounded">Edit Goals</button>
                <button className="bg-orange-500 hover:bg-orange-400 py-2 rounded">Edit Info</button>
                <button className="bg-orange-500 hover:bg-orange-400 py-2 rounded">Sign Out</button>
            </div>
        </div>
    );
};

export default ProfilPage;