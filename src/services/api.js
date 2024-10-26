/**
 * Point centralisé pour tous les appels API. Peut utiliser Axios pour interagir avec votre back-end Java Spring via des requêtes HTTP (GET, POST, PUT, DELETE).
 */

// services/api.js
const apiRequest = async (endpoint, method = 'GET', body = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(`http://localhost:8080/api${endpoint}`, options);
    if (!response.ok) {
        throw new Error(`Request failed: ${response.statusText}`);
    }
    return response.json();
};

export default apiRequest;


