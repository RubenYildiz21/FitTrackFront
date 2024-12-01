// src/components/CommentModal.js
import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getLoggedInUser } from '../services/authService';
import CommentItem from './CommentItem';

const CommentModal = ({
                          isOpen,
                          onClose,
                          post,
                          comments,
                          onAddComment,
                          onAddReply,
                          newComment,
                          setNewComment,
                      }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-xl w-full max-w-xl h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                    <h3 className="text-lg font-medium">Commentaires</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>

                {/* Zone de commentaires scrollable */}
                <div className="flex-1 overflow-y-auto px-4 py-2">
                    <div className="space-y-3">
                        {comments?.map((comment) => (
                            <CommentItem
                                key={comment.idCommentaire}
                                comment={comment}
                                onReply={onAddReply}
                            />
                        ))}
                    </div>
                </div>

                {/* Zone de saisie fixe */}
                <div className="border-t border-gray-800 p-3">
                    <div className="flex items-start gap-3">
                        <img
                            src={getLoggedInUser()?.profilePicture || '/default-avatar.png'}
                            alt="Avatar"
                            className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1 flex items-end gap-2">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Ajouter un commentaire..."
                                className="flex-1 bg-transparent text-sm resize-none focus:outline-none"
                                rows="1"
                            />
                            <button
                                onClick={onAddComment}
                                className="text-orange-500 font-semibold text-sm hover:text-blue-400"
                            >
                                Publier
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;
