import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { validateEmail, validatePassword } from '../utils/validation';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        // Validation de l'email
        if (!validateEmail(email)) {
            setError('Format d\'email invalide');
            return false;
        }

        // Validation du nouveau mot de passe
        if (!validatePassword(newPassword)) {
            setError('Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial');
            return false;
        }

        // Vérification de la correspondance des mots de passe
        if (newPassword !== confirmPassword) {
            setError('Les nouveaux mots de passe ne correspondent pas');
            return false;
        }

        // Vérification que l'ancien et le nouveau mot de passe sont différents
        if (oldPassword === newPassword) {
            setError('Le nouveau mot de passe doit être différent de l\'ancien');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/password/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `email=${encodeURIComponent(email)}&oldPassword=${encodeURIComponent(oldPassword)}&newPassword=${encodeURIComponent(newPassword)}`,
            });

            const data = await response.text();

            if (response.ok) {
                setMessage(data);
                setTimeout(() => navigate('/LoginPage'), 2000);
            } else {
                setError(data);
            }
        } catch (err) {
            setError('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    // Fonction pour afficher les critères du mot de passe
    const renderPasswordCriteria = () => {
        const criteria = [
            { test: /.{8,}/, text: 'Au moins 8 caractères' },
            { test: /[A-Z]/, text: 'Une lettre majuscule' },
            { test: /\d/, text: 'Un chiffre' },
            { test: /[!@#$%^&*(),.?":{}|<>]/, text: 'Un caractère spécial' }
        ];

        return (
            <div className="mt-2 space-y-1">
                {criteria.map((criterion, index) => (
                    <div
                        key={index}
                        className={`text-xs flex items-center gap-2 ${
                            criterion.test.test(newPassword)
                                ? 'text-green-500'
                                : 'text-gray-400'
                        }`}
                    >
                        <div className={`w-1.5 h-1.5 rounded-full ${
                            criterion.test.test(newPassword)
                                ? 'bg-green-500'
                                : 'bg-gray-400'
                        }`} />
                        {criterion.text}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-md mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                        <span>Retour</span>
                    </button>
                </div>

                {/* Messages */}
                {message && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
                        {error}
                    </div>
                )}

                {/* Formulaire */}
                <div className="bg-gray-900/50 rounded-xl p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-400">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                placeholder="exemple@email.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-400">
                                Ancien mot de passe
                            </label>
                            <div className="relative">
                                <input
                                    type={showOldPassword ? "text" : "password"}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showOldPassword ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-400">
                                Nouveau mot de passe
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showNewPassword ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {renderPasswordCriteria()}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-400">
                                Confirmer le nouveau mot de passe
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 bg-orange-500 hover:bg-orange-600 rounded-xl font-medium transition-colors
                                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Modification en cours...
                                </div>
                            ) : (
                                'Changer le mot de passe'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;