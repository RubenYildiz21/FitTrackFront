// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EditGoals from './pages/EditGoals';


const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/edit-goals" element={<EditGoals />} />
        </Routes>
    </Router>
);

export default AppRoutes;
