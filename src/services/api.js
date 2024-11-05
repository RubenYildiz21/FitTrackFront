/**
 * Point centralisé pour tous les appels API. Peut utiliser Axios pour interagir avec votre back-end Java Spring via des requêtes HTTP (GET, POST, PUT, DELETE).
 */

// services/api.js
const apiRequest = async (endpoint, method = 'GET', body = null, isFormUrlEncoded = false) => {
    let options = {
        method,
        headers: {
            'Content-Type': isFormUrlEncoded ? 'application/x-www-form-urlencoded' : 'application/json',
        },
    };

    if (body) {
        options.body = isFormUrlEncoded ? new URLSearchParams(body).toString() : JSON.stringify(body);
    }

    const response = await fetch(`http://localhost:8080/api${endpoint}`, options);
    if (!response.ok) {
        throw new Error(`Request failed: ${response.statusText}`);
    }
    return response.json();
};



export default apiRequest;



