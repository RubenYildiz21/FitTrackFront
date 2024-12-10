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
import MenuPage from "./pages/MenuPage";
import CreatePostPage from "./pages/CreatePostPage";
import ProgressPage from "./pages/ProgressPage";
import Challenges from "./pages/Challenges";
import CreateChallenge from "./pages/CreateChallenge";
import ForgotPassword from "./pages/ForgotPassword";
import AllSeance from './pages/AllSeance';
import SeanceDetail from './pages/SeanceDetail';
import WorkoutForm from './pages/WorkoutForm';
import Classement from './pages/Classement';


import PrivateRoute from './components/PrivateRoutes';
import AdminPanel from "./pages/AdminPanel";

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/EditGoals" element={<EditGoals />} />
            <Route path="/MultiStepForm" element={<MultiStepForm />} />
            <Route path="/Profil" element={<ProfilPage />} />
            <Route path='/EditProfile' element={<EditProfile />} />
            <Route path="/LoaderPage" element={<LoaderPage />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />



            {/* Routes protégées */}
            <Route path="/MenuPage" element={
                <PrivateRoute>
                    <MenuPage />
                </PrivateRoute>
            } />
            <Route path="/create-post" element={
                <PrivateRoute>
                    <CreatePostPage />
                </PrivateRoute>
            } />
            <Route path="/AdminPanel" element={
                <PrivateRoute>
                    <AdminPanel />
                </PrivateRoute>
            } />
            <Route path="/Profil" element={
                <PrivateRoute>
                    <ProfilPage />
                </PrivateRoute>
            } />
            <Route path="/EditGoals" element={
                <PrivateRoute>
                    <EditGoals />
                </PrivateRoute>
            } />
            <Route path="/EditProfile" element={
                <PrivateRoute>
                    <EditProfile />
                </PrivateRoute>
            } />
            <Route path="/WorkoutForm" element={
                <PrivateRoute>
                    <WorkoutForm />
                </PrivateRoute>
            } />
            <Route path="/Search" element={
                <PrivateRoute>
                    <UserSearchPage />
                </PrivateRoute>
            } />

            <Route path="/progress" element={
                <PrivateRoute>
                    <ProgressPage />
                </PrivateRoute>
            } />

            <Route path="/Challenges" element={
                <PrivateRoute>
                    <Challenges />
                </PrivateRoute>
            } />

            <Route path="/Classement/:challengeId" element={
                <PrivateRoute>
                    <Classement />
                </PrivateRoute>
            } />

            <Route path="/CreateChallenge" element={
                <PrivateRoute>
                    <CreateChallenge />
                </PrivateRoute>
            } />

            <Route path="/AllSeance" element={
                <PrivateRoute>
                    <AllSeance />
                </PrivateRoute>
            } />

            <Route path="/seance/:idSeance" element={
                <PrivateRoute>
                    <SeanceDetail />
                </PrivateRoute>
            } />

        </Routes>

    </Router>
);

export default AppRoutes;
