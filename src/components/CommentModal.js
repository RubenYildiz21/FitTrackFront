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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden relative mx-auto">
                {/* Header de la modal */}
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Commentaires</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Corps de la modal */}
                <div className="p-4 overflow-y-auto max-h-[60vh]">
                    {/* Liste des commentaires */}
                    <div className="space-y-4">
                        {comments?.map((comment) => (
                            <CommentItem key={comment.idCommentaire} comment={comment} onReply={onAddReply} />
                        ))}
                    </div>
                </div>

                {/* Footer avec le formulaire de commentaire */}
                <div className="p-4 border-t border-gray-700">
                    <div className="flex space-x-3">
                        <img
                            src={getLoggedInUser()?.profilePicture || '/default-avatar.png'}
                            alt="Votre avatar"
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

export default CommentModal;
