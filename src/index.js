/**
 *
 * Le point d'entrée du projet. Ce fichier rend l'application dans le DOM, configure le store Redux et le passe à travers un Provider afin que toute l'application ait accès à l'état global.
 */

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './tailwind.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
