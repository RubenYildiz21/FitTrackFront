/**
 * Point centralisé pour tous les appels API. Peut utiliser Axios pour interagir avec votre back-end Java Spring via des requêtes HTTP (GET, POST, PUT, DELETE).
 */

// services/api.js
const apiRequest = async (endpoint, method = 'GET', body = null, isFormUrlEncoded = false) => {
    let options = {
        method,
        credentials: 'include',
        headers: {},
    };

    // Gérer les données du corps
    if (body) {
        if (body instanceof FormData) {
            options.body = body;
            // Pas de Content-Type, car le navigateur s'en occupe pour FormData
        } else if (isFormUrlEncoded) {
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            options.body = new URLSearchParams(body).toString();
        } else {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }
    }

    const response = await fetch(`http://localhost:8080/api${endpoint}`, options);
    if (!response.ok) {
        throw new Error(`Request failed: ${response.statusText}`);
    }
    return response.json();
};




export default apiRequest;



