// src/pages/MenuPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../services/authService';
import {
    ChatBubbleLeftEllipsisIcon,
    XMarkIcon,
    HeartIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Navbar from './shared/Navbar';
import SearchBar from './shared/Searchbar';
import CommentModal from '../components/CommentModal';

const MenuPage = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [commentaires, setCommentaires] = useState({});
    const [newComment, setNewComment] = useState('');
    const [likedPosts, setLikedPosts] = useState(new Set());

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/posts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erreur lors du chargement des publications');
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Erreur lors du chargement des publications', error);
        } finally {
            setLoading(false);
        }
    };

    const loadComments = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `http://localhost:8080/api/commentaires/post/${postId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                setCommentaires((prev) => ({
                    ...prev,
                    [postId]: data,
                }));
            }
        } catch (error) {
            console.error('Erreur lors du chargement des commentaires', error);
        }
    };

    const handleOpenComments = async (post) => {
        setSelectedPost(post);
        await loadComments(post.idPost);
    };

    const handleCloseComments = () => {
        setSelectedPost(null);
        setNewComment('');
    };

    const handleAddComment = async () => {
        if (!selectedPost || !newComment.trim()) return;

        const user = getLoggedInUser();
        if (!user?.id) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/commentaires', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    message: newComment,
                    postId: selectedPost.idPost,
                    userId: user.id,
                }),
            });

            if (response.ok) {
                setNewComment('');
                await loadComments(selectedPost.idPost);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire", error);
        }
    };

    const handleAddReply = async (parentCommentId, replyMessage) => {
        if (!selectedPost || !replyMessage.trim()) return;

        const user = getLoggedInUser();
        if (!user?.id) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/commentaires', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    message: replyMessage,
                    postId: selectedPost.idPost,
                    userId: user.id,
                    parentCommentId: parentCommentId,
                }),
            });

            if (response.ok) {
                await loadComments(selectedPost.idPost);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la réponse", error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleLike = async (postId) => {
        const user = getLoggedInUser();
        if (!user?.id) return;

        const token = localStorage.getItem('token');
        const isLiked = likedPosts.has(postId);

        try {
            const response = await fetch(
                `http://localhost:8080/api/posts/${postId}/like?userId=${user.id}`,
                {
                    method: isLiked ? 'DELETE' : 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedPost = await response.json();
            setPosts(posts.map((p) => (p.idPost === postId ? updatedPost : p)));

            setLikedPosts((prev) => {
                const newSet = new Set(prev);
                if (isLiked) {
                    newSet.delete(postId);
                } else {
                    newSet.add(postId);
                }
                return newSet;
            });
        } catch (error) {
            console.error('Erreur lors du like/unlike', error);
        }
    };

    useEffect(() => {
        const checkLikedPosts = async () => {
            const user = getLoggedInUser();
            if (!user?.id) return;

            const token = localStorage.getItem('token');
            if (!token) return;

            for (const post of posts) {
                try {
                    const response = await fetch(
                        `http://localhost:8080/api/posts/${post.idPost}/hasLiked?userId=${user.id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    if (!response.ok) {
                        if (response.status === 403) {
                            console.error("Erreur d'authentification");
                            continue;
                        }
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const hasLiked = await response.json();
                    if (hasLiked) {
                        setLikedPosts((prev) => new Set([...prev, post.idPost]));
                    }
                } catch (error) {
                    console.error('Erreur lors de la vérification des likes', error);
                }
            }
        };

        if (posts.length > 0) {
            checkLikedPosts();
        }
    }, [posts]);

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />
            <SearchBar />

            {/* Container principal avec largeur maximale */}
            <div className="max-w-2xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-semibold mb-8">Feed</h1>

                {/* État de chargement */}
                {loading ? (
                    <div className="text-gray-400 text-center py-8">Chargement...</div>
                ) : posts.length === 0 ? (
                    <div className="text-gray-400 text-center py-8">Aucune publication disponible.</div>
                ) : (
                    <div className="space-y-8">
                        {posts.map((post) => (
                            <div
                                key={post.idPost}
                                className="bg-gray-900 rounded-xl overflow-hidden"
                            >
                                {/* Header du post */}
                                <div className="flex items-center p-4">
                                    <img
                                        src={post.userProfilePicture || '/default-avatar.png'}
                                        alt={`${post.userFirstName}`}
                                        className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-800"
                                    />
                                    <div className="ml-3">
                                        <h3 className="font-medium">
                                            {post.userFirstName} {post.userLastName}
                                        </h3>
                                        <p className="text-xs text-gray-400">
                                            {formatDate(post.dateCreation)}
                                        </p>
                                    </div>
                                </div>

                                {/* Image du post */}
                                {post.imageUrl && (
                                    <div className="aspect-square">
                                        <img
                                            src={post.imageUrl}
                                            alt="Post"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="p-4">
                                    <div className="flex items-center gap-4 mb-3">
                                        <button
                                            onClick={() => handleLike(post.idPost)}
                                            className="hover:scale-110 transition-transform"
                                        >
                                            {likedPosts.has(post.idPost) ? (
                                                <HeartSolidIcon className="h-7 w-7 text-red-500" />
                                            ) : (
                                                <HeartIcon className="h-7 w-7" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleOpenComments(post)}
                                            className="hover:scale-110 transition-transform"
                                        >
                                            <ChatBubbleLeftEllipsisIcon className="h-7 w-7" />
                                        </button>
                                    </div>

                                    {/* Likes count */}
                                    <div className="font-medium mb-2">
                                        {post.nombreLikes} j'aime
                                    </div>

                                    {/* Contenu du post */}
                                    <div className="text-sm">
                                    <span className="font-medium mr-2">
                                        {post.userFirstName}
                                    </span>
                                        {post.contenu}
                                    </div>

                                    {/* Bouton commentaires */}
                                    <button
                                        onClick={() => handleOpenComments(post)}
                                        className="text-gray-400 text-sm mt-2"
                                    >
                                        Voir les commentaires
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal des commentaires */}
            <CommentModal
                isOpen={selectedPost !== null}
                onClose={handleCloseComments}
                post={selectedPost}
                comments={selectedPost ? commentaires[selectedPost.idPost] : []}
                onAddComment={handleAddComment}
                onAddReply={handleAddReply}
                newComment={newComment}
                setNewComment={setNewComment}
            />

            {/* Bouton création post */}
            <button
                className="fixed bottom-24 right-8 bg-orange-500 hover:bg-orange-600-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-2xl transform transition-all hover:scale-110 active:scale-95"
                onClick={() => navigate('/create-post')}
            >
                +
            </button>
        </div>
    );
};

export default MenuPage;
