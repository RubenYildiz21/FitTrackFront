import React, { useEffect, useState } from 'react';
import { follow } from '../../services/authService';
import apiRequest from "../../services/api";

const Searchbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [followingUsers, setFollowingUsers] = useState([]);
    const loggedInUserId = JSON.parse(sessionStorage.getItem('user')).id;
    const [formData, setFormData] = useState({
        id: 0,
        followId: 0,
        followerId: 0,
    });

    useEffect(() => {
        // Fonction pour lancer la recherche à chaque modification du terme
        const searchUsers = async () => {
            try {
                /**const response = await fetch(`http://localhost:8080/api/users/search?query=${searchTerm}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la recherche d\'utilisateurs');
                }
                const data = await response.json();*/
                const data = await apiRequest(`/users/search?query=${searchTerm}`, "GET")
                const filteredUsers = data.filter(user => user.id !== loggedInUserId);
                setUsers(filteredUsers);
                userFollow();

                // Check if the logged-in user follows each user
                //checkFollowStatus(filteredUsers);
            } catch (error) {
                console.error("Erreur de recherche", error);
                setError("Impossible de rechercher les utilisateurs.");
            }
        };

        if (searchTerm) {
            searchUsers();
        }
    }, [searchTerm]);

    // Fonction pour récupérer tous les utilisateurs si le terme de recherche est vide
    /**const fetchAllUsers = async () => {
        try {
            const response = await apiRequest("/users/all", "GET");
            const filteredUsers = response.filter(user => user.id !== loggedInUserId);
            setUsers(filteredUsers);
            userFollow(filteredUsers);
        } catch (error) {
            console.error("Error fetching users", error);
            setError("Could not fetch users.");
        }
    };*/

    // Fonction pour récupérer les user deja follow
    const userFollow = async () => {
        try {
            /**const response = await fetch(`http://localhost:8080/api/follows/${loggedInUserId}/following`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();*/
            const data = await apiRequest(`/follows/${loggedInUserId}/following`, "GET");
            //const filteredUsers = data.filter(user => user.id !== loggedInUserId);
            setFollowingUsers(data);
        } catch (error) {
            console.error("Error fetching users followed", error);
            setError("Could not fetch users followed.");
        }
    };

    // Gestion du changement de la barre de recherche
    const handleSearchChange = (e) => {
        if (e.target.value === "") {
            let data = [];
            setUsers(data);
        }
        setSearchTerm(e.target.value);
        setError(null);
    };

    // Fonction pour suivre un utilisateur
    const followUser = async (userId) => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("followId", userId);
            formDataToSend.append("followerId", loggedInUserId);

            try {
                const data = await follow(formDataToSend);
                if (data.action === "follow") {
                    followingUsers.push(userId);
                    setFollowingUsers([...followingUsers, userId]);
                    console.log('User followed successfully:', data.message);
                } else if (data.action === "unfollow") {
                    setFollowingUsers(followingUsers.filter(id => id !== userId));
                    console.log('User unfollowed successfully:', data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } catch (error) {
            console.error("Erreur lors du suivi", error);
            setError("Impossible de suivre l'utilisateur.");
        }
    };

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
        <div>
            {/* Barre de recherche en haut de la page avec largeur complète */}
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Recherchez par nom ou prénom"
                className="w-full p-2 border border-gray-300 rounded text-white bg-gray-800"
            />

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-gray-800 shadow">
                    <div className="flex items-center">
                        <img
                            src={user.profilePicture ? user.profilePicture : require('../../assets/images/profile.png')}
                            alt="User profile"
                            className="w-12 h-12 rounded-full mr-4"
                        />
                        <h2 className="text-lg font-semibold text-white">{user.firstName} {user.lastName}</h2>
                    </div>
                    <button
                        onClick={() => followUser(user.id)}
                        className={`p-2 rounded text-white ${
                            followingUsers.includes(user.id) ? 'bg-red-500' : 'bg-green-500'
                        }`}
                    >
                        {followingUsers.includes(user.id) ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Searchbar;