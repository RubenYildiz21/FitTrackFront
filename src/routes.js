// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';


const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />

        </Routes>
    </Router>
);

export default AppRoutes;
