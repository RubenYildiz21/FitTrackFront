// src/App.js
// src/App.js
import React from 'react';
import AppRoutes from './routes';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
    return (
        <GoogleOAuthProvider clientId="339831490020-tm4mffpeuvqtnik0h3mhmup7c7roq83q.apps.googleusercontent.com">
            <div className="App">
                <AppRoutes />
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;

