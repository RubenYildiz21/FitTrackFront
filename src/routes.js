// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import EditGoals from './pages/EditGoals';
import MultiStepForm from './pages/MultiStepForm'
import LoaderPage from './pages/LoaderPage';




const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/EditGoals" element={<EditGoals />} />
            <Route path="/MultiStepForm" element={<MultiStepForm />} />
            <Route path="/LoaderPage" element={<LoaderPage />} />
        </Routes>
    </Router>
);

export default AppRoutes;
