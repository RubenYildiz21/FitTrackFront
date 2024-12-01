// src/components/CommentItem.js
import React, { useState } from 'react';
import { getLoggedInUser } from '../services/authService';

const CommentItem = ({ comment, onReply }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyMessage, setReplyMessage] = useState('');

    const handleReply = () => {
        setShowReplyForm(!showReplyForm);
    };

    const submitReply = () => {
        onReply(comment.idCommentaire, replyMessage);
        setReplyMessage('');
        setShowReplyForm(false);
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

    return (
        <div className="ml-4">
            <div className="flex space-x-3 p-3 bg-gray-700 rounded-lg">
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
                    <button
                        onClick={handleReply}
                        className="text-sm text-gray-400 hover:text-orange-500 mt-1"
                    >
                        Répondre
                    </button>
                </div>
            </div>

            {showReplyForm && (
                <div className="ml-12 mt-2">
                    <div className="flex space-x-3">
                        <img
                            src={getLoggedInUser()?.profilePicture || '/default-avatar.png'}
                            alt="Votre avatar"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
              <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Votre réponse..."
                  className="w-full p-2 bg-gray-700 text-white rounded-lg resize-none"
                  rows="2"
              />
                            <button
                                onClick={submitReply}
                                className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg transition-colors"
                            >
                                Répondre
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {comment.replies && comment.replies.length > 0 && (
                <div className="ml-8 mt-4 space-y-4">
                    {comment.replies.map((reply) => (
                        <CommentItem key={reply.idCommentaire} comment={reply} onReply={onReply} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentItem;
