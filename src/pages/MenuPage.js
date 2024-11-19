import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../services/authService';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';

const MenuPage = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showComments, setShowComments] = useState({});
    const [newComments, setNewComments] = useState({});

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/posts');
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des publications');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Erreur lors du chargement des publications", error);
            } finally {
                setLoading(false);
            }
        };
        loadPosts();
    }, []);

    const toggleComments = (postId) => {
        setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
    };

    const handleAddComment = async (postId) => {
        const user = getLoggedInUser();

        if (!user || !user.id) {
            console.error("L'utilisateur doit être connecté pour ajouter un commentaire.");
            return;
        }

        const commentData = {
            message: newComments[postId],
            user: { id: user.id },
            post: { idPost: postId },
        };

        try {
            const response = await fetch('http://localhost:8080/api/commentaires', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData),
            });

            if (response.ok) {
                const updatedComment = await response.json();

                setPosts((prevPosts) =>
                    prevPosts.map((post) => {
                        if (post.idPost === postId) {
                            return {
                                ...post,
                                commentaires: [...(post.commentaires || []), updatedComment],
                            };
                        }
                        return post;
                    })
                );

                setNewComments((prev) => ({ ...prev, [postId]: '' }));
            } else {
                console.error("Erreur lors de l'ajout du commentaire");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire", error);
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen p-6 relative">
            <h1 className="text-3xl font-bold mb-6">Feed de Publications</h1>

            <div className="space-y-6">
                {loading ? (
                    <div className="text-gray-500">Chargement...</div>
                ) : posts.length === 0 ? (
                    <div className="text-gray-500">Aucune publication disponible.</div>
                ) : (
                    posts.map((post) => (
                        <div key={post.idPost} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            {/* Affichage de l'utilisateur */}
                            <div className="flex items-center mb-4">
                                <img
                                    src={`data:image/jpeg;base64,${post.user?.profilePicture}`}
                                    alt={`${post.user?.firstName} ${post.user?.lastName}`}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{post.user?.firstName} {post.user?.lastName}</h3>
                                    <p className="text-gray-400 text-sm">Posté le {new Date(post.dateCreation).toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Contenu du post */}
                            <p className="text-gray-300 mb-4">{post.contenu}</p>

                            {/* Bouton pour afficher/masquer les commentaires */}
                            <button
                                onClick={() => toggleComments(post.idPost)}
                                className="text-orange-500 hover:text-orange-600 flex items-center"
                            >
                                <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
                                <span className="ml-2">
                                    {showComments[post.idPost] ? 'Masquer les commentaires' : 'Voir les commentaires'}
                                </span>
                            </button>

                            {/* Section des commentaires */}
                            {showComments[post.idPost] && (
                                <div className="mt-4 border-t border-gray-700 pt-4">
                                    <h3 className="text-lg font-semibold">Commentaires :</h3>
                                    {post.commentaires && post.commentaires.length > 0 ? (
                                        post.commentaires.map((comment) => (
                                            <div key={comment.idCommentaire} className="mt-2 pl-4 border-l border-orange-500">
                                                <div className="flex items-center mb-2">
                                                    <img
                                                        src={`data:image/jpeg;base64,${comment.user?.profilePicture}`}
                                                        alt={`${comment.user?.firstName} ${comment.user?.lastName}`}
                                                        className="w-8 h-8 rounded-full mr-2"
                                                    />
                                                    <span className="font-semibold">{comment.user?.firstName} {comment.user?.lastName}</span>
                                                    <span className="text-gray-400 text-sm ml-2">
                                                        - {new Date(comment.dateCommentaire).toLocaleString()}
                                                    </span>
                                                </div>
                                                <p>{comment.message}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">Aucun commentaire pour ce post.</p>
                                    )}

                                    {/* Champ pour ajouter un nouveau commentaire */}
                                    <div className="mt-4">
                                        <textarea
                                            value={newComments[post.idPost] || ''}
                                            onChange={(e) => setNewComments({ ...newComments, [post.idPost]: e.target.value })}
                                            placeholder="Ajouter un commentaire..."
                                            className="w-full p-2 bg-gray-800 text-white rounded resize-none"
                                        ></textarea>
                                        <button
                                            onClick={() => handleAddComment(post.idPost)}
                                            className="mt-2 bg-orange-500 hover:bg-orange-600 text-white py-1 px-4 rounded"
                                        >
                                            Publier le commentaire
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Bouton pour créer une nouvelle publication */}
            <button
                className="fixed bottom-8 right-8 bg-orange-500 hover:bg-orange-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-3xl transform transition-transform hover:scale-105"
                onClick={() => navigate('/create-post')}
            >
                +
            </button>
        </div>
    );
};

export default MenuPage;
