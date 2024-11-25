import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../services/authService';
import { ChatBubbleLeftEllipsisIcon, XMarkIcon,HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Navbar from './shared/Navbar';
import SearchBar from './shared/Searchbar';


const CommentModal = ({ isOpen, onClose, post, comments, onAddComment, newComment, setNewComment }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden relative mx-auto">
                {/* Header de la modal */}
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Commentaires</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Corps de la modal */}
                <div className="p-4 overflow-y-auto max-h-[60vh]">
                    {/* Liste des commentaires */}
                    <div className="space-y-4">
                        {comments?.map((comment) => (
                            <div key={comment.idCommentaire} className="flex space-x-3 p-3 bg-gray-700 rounded-lg">
                                {/* Photo de profil du commentateur */}
                                <img
                                    src={comment.userProfilePicture || '/default-avatar.png'}
                                    alt={`${comment.userFirstName} ${comment.userLastName}`}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                    <span className="font-semibold">
                                        {comment.userFirstName} {comment.userLastName}
                                    </span>
                                        <span className="text-sm text-gray-400">
                                        {formatDate(comment.dateCommentaire)}
                                    </span>
                                    </div>
                                    <p className="text-gray-300 mt-1">{comment.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer avec le formulaire de commentaire */}
                <div className="p-4 border-t border-gray-700">
                    <div className="flex space-x-3">
                        <img
                            src={getLoggedInUser()?.profilePicture || '/default-avatar.png'}
                            alt="Your avatar"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Ajouter un commentaire..."
                            className="w-full p-3 bg-gray-700 text-white rounded-lg resize-none"
                            rows="2"
                        />
                            <button
                                onClick={onAddComment}
                                className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Commenter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

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
                    'Authorization': `Bearer ${token}`
                }
            });

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

    const loadComments = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/commentaires/post/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setCommentaires(prev => ({
                    ...prev,
                    [postId]: data
                }));
            }
        } catch (error) {
            console.error("Erreur lors du chargement des commentaires", error);
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
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    message: newComment,
                    postId: selectedPost.idPost,
                    userId: user.id
                })
            });

            if (response.ok) {
                setNewComment('');
                await loadComments(selectedPost.idPost);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire", error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
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
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedPost = await response.json();
            setPosts(posts.map(p => p.idPost === postId ? updatedPost : p));

            setLikedPosts(prev => {
                const newSet = new Set(prev);
                if (isLiked) {
                    newSet.delete(postId);
                } else {
                    newSet.add(postId);
                }
                return newSet;
            });
        } catch (error) {
            console.error("Erreur lors du like/unlike", error);
        }
    };

// Modifiez également la vérification initiale des likes
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
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
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
                        setLikedPosts(prev => new Set([...prev, post.idPost]));
                    }
                } catch (error) {
                    console.error("Erreur lors de la vérification des likes", error);
                }
            }
        };

        if (posts.length > 0) {
            checkLikedPosts();
        }
    }, [posts]);

    return (
        <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen p-6 relative mb-10">
            <Navbar/>
            <SearchBar/>
            <h1 className="text-3xl font-bold mb-6 mt-4">Feed de Publications</h1>

            <div className="space-y-6">
                {loading ? (
                    <div className="text-gray-500">Chargement...</div>
                ) : posts.length === 0 ? (
                    <div className="text-gray-500">Aucune publication disponible.</div>
                ) : (
                    posts.map((post) => (
                        <div key={post.idPost}
                             className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            {/* En-tête du post avec les informations de l'utilisateur */}
                            <div className="flex items-center mb-4">
                                {post.userProfilePicture && (
                                    <img
                                        src={post.userProfilePicture}
                                        alt={`${post.userFirstName} ${post.userLastName}`}
                                        className="w-12 h-12 rounded-full mr-4 object-cover"
                                    />
                                )}
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {post.userFirstName} {post.userLastName}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {formatDate(post.dateCreation)}
                                    </p>
                                </div>
                            </div>

                            {/* Contenu du post */}
                            <p className="text-gray-300 mb-4">{post.contenu}</p>

                            {/* Image du post */}
                            {post.imageUrl && (
                                <div className="mt-4">
                                    <img
                                        src={post.imageUrl}
                                        alt="Post"
                                        className="rounded-lg max-h-96 w-full object-cover"
                                    />
                                </div>
                            )}


                            <div className="mt-4 flex items-center space-x-4">
                                <button
                                    onClick={() => handleLike(post.idPost)}
                                    className="flex items-center space-x-2 text-gray-400 hover:text-orange-500 transition-colors"
                                >
                                    {likedPosts.has(post.idPost) ? (
                                        <HeartSolidIcon className="h-6 w-6 text-orange-500"/>
                                    ) : (
                                        <HeartIcon className="h-6 w-6"/>
                                    )}
                                    <span>{post.nombreLikes} likes</span>
                                </button>
                                <button
                                    onClick={() => handleOpenComments(post)}
                                    className="flex items-center space-x-2 text-gray-400 hover:text-orange-500 transition-colors"
                                >
                                    <ChatBubbleLeftEllipsisIcon className="h-6 w-6"/>
                                    <span>commentaires</span>
                                </button>
                            </div>
                        </div>

                    ))
                )}
            </div>

            {/* Modal des commentaires */}
            <CommentModal
                isOpen={selectedPost !== null}
                onClose={handleCloseComments}
                post={selectedPost}
                comments={selectedPost ? commentaires[selectedPost.idPost] : []}
                onAddComment={handleAddComment}
                newComment={newComment}
                setNewComment={setNewComment}
            />

            {/* Bouton création post */}
            <button
                className="fixed bottom-24 right-8 bg-orange-500 hover:bg-orange-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-3xl transform transition-transform hover:scale-105"
                onClick={() => navigate('/create-post')}
            >
                +
            </button>
        </div>
    );
};

export default MenuPage;