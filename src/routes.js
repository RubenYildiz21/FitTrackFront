// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import EditGoals from './pages/EditGoals';
import MultiStepForm from './pages/MultiStepForm'
import ProfilPage from './pages/ProfilPage'
import EditProfile from './pages/EditProfile';
import LoaderPage from './pages/LoaderPage';
import WorkoutForm from './pages/WorkoutForm';
import UserSearchPage from "./pages/UserSearchPage";



const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/EditGoals" element={<EditGoals />} />
            <Route path="/MultiStepForm" element={<MultiStepForm />} />
            <Route path="/Profil" element={<ProfilPage />} />
            <Route path='/EditProfile' element={<EditProfile />}/>
            <Route path="/LoaderPage" element={<LoaderPage />} />
            <Route path="/WorkoutForm" element={<WorkoutForm />} />
            <Route path="/Search" element={<UserSearchPage />} />

        </Routes>
    </Router>
);

export default AppRoutes;
