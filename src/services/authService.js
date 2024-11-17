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


export const loginUser = async (credentials) => {
    try {
        const response = await apiRequest('/auth/login', 'POST', credentials);
        console.log('User logged in successfully:', response);
        return response;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const follow = async (followData) => {
    try {
        const response = await apiRequest('/connection/follow', 'POST', followData);
        //console.log('User followed successfully:', response);
        //console.log("Ok0");
        return response;
    } catch (error) {
        console.error('Follow error:', error);
        throw error;
    }
};