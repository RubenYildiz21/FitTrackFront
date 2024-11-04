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
        const response = await apiRequest('/auth/login', 'POST', credentials, true);
        console.log('User logged in successfully:', response);
        return response;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};



export const googleLogin = async (credentialResponse) => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                token: credentialResponse.credential
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Server response:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Google login error:', error);
        throw error;
    }
};