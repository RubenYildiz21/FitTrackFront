import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../services/authService';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';

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
        <div className="min-h-screen bg-black text-white">
            {/* Container principal */}
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-semibold">Nouvelle publication</h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-400 hover:text-white"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {error && (
                    <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleCreatePost} className="space-y-6">
                    {/* Zone de prévisualisation d'image */}
                    {imagePreview ? (
                        <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden">
                            <img
                                src={imagePreview}
                                alt="Aperçu"
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setImagePreview(null);
                                    setSelectedImage(null);
                                }}
                                className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="relative aspect-square bg-gray-900 rounded-lg flex flex-col items-center justify-center">
                            <input
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <PhotoIcon className="h-12 w-12 text-gray-500 mb-2" />
                            <span className="text-gray-500 text-sm">Ajouter une photo</span>
                        </div>
                    )}

                    {/* Zone de texte */}
                    <div className="relative">
                    <textarea
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="Écrivez une légende..."
                        className="w-full p-4 bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none"
                        rows="4"
                        required
                    ></textarea>
                        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                            {postContent.length}/500
                        </div>
                    </div>

                    {/* Bouton de publication */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 px-4 rounded-lg bg-orange-500 hover:bg-orange-600 
                        transition-colors font-medium
                        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Publication en cours...
                            </div>
                        ) : (
                            'Publier'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePostPage;