import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../services/authService';

const CreatePostPage = () => {
    const navigate = useNavigate();
    const [postContent, setPostContent] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            // Créer un aperçu de l'image
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const user = getLoggedInUser();

        if (!user || !user.id) {
            setError("Vous devez être connecté pour créer une publication.");
            setIsLoading(false);
            return;
        }

        try {
            // Créer un FormData pour envoyer les données multipart
            const formData = new FormData();
            formData.append('contenu', postContent);
            formData.append('userId', user.id);
            if (selectedImage) {
                formData.append('image', selectedImage);
            }

            const token = localStorage.getItem('token'); // Assurez-vous d'avoir le token stocké

            const response = await fetch('http://localhost:8080/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-6">Créer une Publication</h1>

            {error && (
                <div className="text-red-500 mb-4 p-3 bg-red-100 rounded">{error}</div>
            )}

            <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                    <textarea
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="Quoi de neuf ?"
                        className="w-full p-4 bg-gray-800 text-white rounded resize-none h-40"
                        required
                    ></textarea>
                </div>

                <div className="space-y-2">
                    <label className="block">
                        <span className="text-white">Ajouter une image</span>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="mt-1 block w-full text-sm text-gray-300
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-orange-500 file:text-white
                                hover:file:bg-orange-600"
                        />
                    </label>

                    {imagePreview && (
                        <div className="mt-2">
                            <img
                                src={imagePreview}
                                alt="Aperçu"
                                className="max-w-xs rounded-lg shadow-lg"
                            />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded w-full
                        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Publication en cours...' : 'Publier'}
                </button>
            </form>
        </div>
    );
};

export default CreatePostPage;