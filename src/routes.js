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
import UserSearchPage from "./pages/UserSearchPage";
import Challenges from "./pages/Challenges";
import CreateChallenge from "./pages/CreateChallenge";
import Classement from "./pages/Classement";




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
            <Route path="/Search" element={<UserSearchPage />} />
            <Route path="/CreateChallenge" element={<CreateChallenge/>} />
            <Route path="/Challenges" element={<Challenges/>} />
            <Route path="/Classement/:challengeId" element={<Classement />} />
        </Routes>
    </Router>
);

export default AppRoutes;
