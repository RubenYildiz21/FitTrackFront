import React, { useEffect, useState } from 'react';
import apiRequest from "../services/api";

const AdminPanel = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            contenu: "Ceci est le premier post.",
            user: { id: 101, name: "Alice" },
            commentaires: [
                { id: 1, contenu: "Premier commentaire", user: { id: 201, name: "John" } },
                { id: 2, contenu: "Deuxième commentaire", user: { id: 202, name: "Jane" } },
            ]
        },
        {
            id: 2,
            contenu: "Voici un autre post intéressant.",
            user: { id: 102, name: "Bob" },
            commentaires: []
        },
        {
            id: 3,
            contenu: "Dernier post pour le moment.",
            user: { id: 103, name: "Charlie" },
            commentaires: [
                { id: 3, contenu: "Commentaire unique", user: { id: 203, name: "Sam" } }
            ]
        }
    ]);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await apiRequest(`/posts/all`, "GET");
                setPosts(data);
            } catch (error) {
                setError('Erreur lors du chargement des posts.');
            }
        };

        //loadPosts();
    }, []);

    const handleDeletePost = async (postId) => {
        try {
            //await deletePost(postId);
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            setError('Erreur lors de la suppression du post.');
        }
    };

    const handleDeleteComment = async (postId, commentId)  => {
        try {
            //await deleteComment(commentId);
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        commentaires: post.commentaires.filter(comment => comment.id !== commentId)
                    };
                }
                return post;
            }));
        } catch (error) {
            setError('Erreur lors de la suppression du commentaire.');
        }
    };

    const handleBanUser = async (userId) => {
        try {
            //await banUser(userId);
            alert('Utilisateur banni avec succès.');
        } catch (error) {
            setError('Erreur lors du bannissement de l\'utilisateur.');
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">Panneau d'administration</h1>
            {error && <div className="text-red-500">{error}</div>}

            <div>
                {posts.map(post => (
                    <div key={post.id} className="p-4 bg-gray-800 mb-4 rounded">
                        <h2 className="text-xl font-semibold">{post.contenu}</h2>
                        <p>Publié par : {post.user.name}</p>
                        <div className="flex mt-2">
                            <button
                                onClick={() => handleDeletePost(post.id)}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2"
                            >
                                Supprimer le post
                            </button>
                            <button
                                onClick={() => handleBanUser(post.user.id)}
                                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
                            >
                                Bannir l'utilisateur
                            </button>
                        </div>

                        {/* Section des commentaires */}
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Commentaires :</h3>
                            {post.commentaires.length === 0 ? (
                                <p className="text-gray-400">Aucun commentaire.</p>
                            ) : (
                                post.commentaires.map(comment => (
                                    <div key={comment.id} className="mt-2 p-2 bg-gray-700 rounded">
                                        <p>{comment.contenu}</p>
                                        <p className="text-sm text-gray-400">Par : {comment.user.name}</p>
                                        <button
                                            onClick={() => handleDeleteComment(post.id, comment.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded mt-2"
                                        >
                                            Supprimer le commentaire
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;