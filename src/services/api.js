/**
 * Point centralisé pour tous les appels API. Peut utiliser Axios pour interagir avec votre back-end Java Spring via des requêtes HTTP (GET, POST, PUT, DELETE).
 */

// services/api.js
const apiRequest = async (endpoint, method = 'GET', body = null, isFormUrlEncoded = false) => {
    const baseUrl = 'https://fit-track-z972.onrender.com:8080/api';
    let options = {
        method,
        headers: {},
        credentials: 'include', // Toujours inclure les credentials
        mode: 'cors' // Explicitement définir le mode CORS
    };
    // Ajouter le token JWT si il est présent dans le local storage
    if (!endpoint.startsWith('/auth/login') && !endpoint.startsWith('/auth/register')) {
        const token = localStorage.getItem('token');
        if(token){
            options.headers['Authorization'] = `Bearer ${token}`;
        } else {
            console.warn("Token JWT non trouvé dans le stockage local.");
        }
        // Inclure les credentials uniquement pour les requêtes nécessitant une authentification
        options.credentials = 'include';
    } else {
        options.credentials = 'omit';
    }
    
    // Gérer les données du corps
    if (body) {
        if (body instanceof FormData) {
            options.body = body;
        } else if (isFormUrlEncoded) {
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            options.body = new URLSearchParams(body).toString();
        } else {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }
    }

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, options);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed: ${response.status} - ${errorText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`API Request Error: ${error.message}`);
        throw error;
    }
};




export default apiRequest;



