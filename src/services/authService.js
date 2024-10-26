/**
 * Logique d'authentification utilisateur, comme l'inscription, la connexion ou la gestion des tokens (JWT).
 */

// services/authServices.js
import apiRequest from './api';

export const registerUser = async (userData) => {
    try {
        const response = await apiRequest('/auth/register', 'POST', userData);
        console.log('User registered successfully:', response);
        return response;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};


