import React, { useEffect, useState } from 'react';

const UserSearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fonction pour lancer la recherche à chaque modification du terme
        const searchUsers = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/auth/users/search?query=${searchTerm}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la recherche d\'utilisateurs');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Erreur de recherche", error);
                setError("Impossible de rechercher les utilisateurs.");
            }
        };

        if (searchTerm) {
            searchUsers();
        } else {
            fetchAllUsers();
        }
    }, [searchTerm]);

    // Fonction pour récupérer tous les utilisateurs si le terme de recherche est vide
    const fetchAllUsers = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/auth/users`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users", error);
            setError("Could not fetch users.");
        }
    };

    // Gestion du changement de la barre de recherche
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Fonction pour suivre un utilisateur
    const followUser = async (userId) => {
        try {
            const currentUser = JSON.parse(localStorage.getItem("user"));
            const followData = {
                follow: { id: userId },
                follower: { id: currentUser.id }
            };

            const response = await fetch(`http://localhost:8080/api/connection/follow`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(followData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Erreur lors du suivi de l'utilisateur");
            }

            alert('Utilisateur suivi avec succès!');
        } catch (error) {
            console.error("Erreur lors du suivi", error);
            setError("Impossible de suivre l'utilisateur.");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-4">Recherche d'utilisateurs</h1>

            <div className="mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Recherchez par nom ou prénom"
                    className="p-2 border border-gray-300 rounded w-full"
                />
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="space-y-4">
                {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-white shadow rounded">
                        <div className="flex items-center">
                            <img
                                src={user.profilePicture ? require(`../assets/images/${user.profilePicture}`) : require('../assets/images/profile.png')}
                                alt="User profile"
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <h2 className="text-lg font-semibold">{user.firstName} {user.lastName}</h2>
                        </div>
                        <button
                            onClick={() => followUser(user.id)}
                            className="bg-green-500 text-white p-2 rounded"
                        >
                            Follow
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserSearchPage;