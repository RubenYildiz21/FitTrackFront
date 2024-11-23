// routes.js
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
import MenuPage from "./pages/MenuPage";
import CreatePostPage from "./pages/CreatePostPage";
import ProgressPage from "./pages/ProgressPage";




import PrivateRoute from './components/PrivateRoutes';
import AdminPanel from "./pages/AdminPanel";

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/MultiStepForm" element={<MultiStepForm />} />
            <Route path="/LoaderPage" element={<LoaderPage />} />
            <Route path="/MenuPage" element={<MenuPage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/AdminPanel" element={<AdminPanel />} />
            <Route path="/create-post" element={<CreatePostPage />} />

            {/* Routes protégées */}
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
        </Routes>
    </Router>
);

export default AppRoutes;
