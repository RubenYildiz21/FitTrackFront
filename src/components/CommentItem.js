// src/components/CommentItem.js
import React, { useState } from 'react';


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
        <div className="group">
            <div className="flex gap-3">
                <img
                    src={comment.userProfilePicture || '/default-avatar.png'}
                    alt={`${comment.userFirstName}`}
                    className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-sm">
                            {comment.userFirstName}
                        </span>
                        <p className="text-sm text-gray-300 inline">{comment.message}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">
                            {formatDate(comment.dateCommentaire)}
                        </span>
                        <button
                            onClick={handleReply}
                            className="text-xs text-gray-500 hover:text-gray-300"
                        >
                            Répondre
                        </button>
                    </div>
                </div>
            </div>

            {/* Zone de réponse */}
            {showReplyForm && (
                <div className="ml-11 mt-2">
                    <div className="flex items-end gap-2">
                        <textarea
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            placeholder="Votre réponse..."
                            className="flex-1 bg-transparent text-sm resize-none focus:outline-none"
                            rows="1"
                        />
                        <button
                            onClick={submitReply}
                            className="text-blue-500 font-semibold text-sm hover:text-blue-400"
                        >
                            Publier
                        </button>
                    </div>
                </div>
            )}

            {/* Réponses */}
            {comment.replies?.length > 0 && (
                <div className="ml-11 mt-3 space-y-3">
                    {comment.replies.map((reply) => (
                        <CommentItem
                            key={reply.idCommentaire}
                            comment={reply}
                            onReply={onReply}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentItem;
