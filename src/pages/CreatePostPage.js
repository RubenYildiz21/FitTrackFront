import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../services/authService';
import Navbar from "./shared/Navbar";
import Searchbar from "./shared/Searchbar";

const CreatePostPage = () => {
    const navigate = useNavigate();
    const [postContent, setPostContent] = useState('');
    const [error, setError] = useState('');

    const handleCreatePost = async (e) => {
        e.preventDefault();
        const user = getLoggedInUser();

        if (!user || !user.id) {
            console.error("L'utilisateur doit être connecté pour créer une publication.");
            setError("Vous devez être connecté pour créer une publication.");
            return;
        }

        const postData = {
            contenu: postContent,
            user: { id: user.id },
        };

        try {
            const response = await fetch('http://localhost:8080/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                const createdPost = await response.json();
                console.log("Publication créée avec succès :", createdPost);
                navigate('/MenuPage');
            } else {
                const errorMessage = await response.text();
                console.error("Erreur lors de l'ajout de la publication", errorMessage);
                setError(errorMessage);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la publication", error);
            setError("Une erreur est survenue lors de la création de la publication.");
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen p-6">
            <Searchbar/>
            <Navbar/>
            <h1 className="text-3xl font-bold mb-6 mt-3">Créer une Publication</h1>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form onSubmit={handleCreatePost}>
                <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Quoi de neuf ?"
                    className="w-full p-4 bg-gray-800 text-white rounded resize-none h-40"
                ></textarea>
                <button
                    type="submit"
                    className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded"
                >
                    Publier
                </button>
            </form>
        </div>
    );
};

export default CreatePostPage;
