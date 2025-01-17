import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/style.css';
import { loginUser, } from '../services/authService';


const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await loginUser({ email, password });

            if (data.token) {
                // Store the JWT token in local storage
                localStorage.setItem('token', data.token);
                // Store the user in local storage
                sessionStorage.setItem('user', JSON.stringify(data.user));

                console.log('User logged in successfully:', data);
                navigate('/MenuPage');
            }

        } catch (err) {
            console.error('Login failed:', err);
            const errorMessage = err.message || '';

            if (errorMessage.includes("401")) {
                setError('Invalid password. Please try again.');
            } else if (errorMessage.includes("404")) {
                setError('User not found. Please check your email.');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    };



    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 animate-fadeIn">

            {/* Container */}
            <div className="w-full max-w-md p-10 bg-black bg-opacity-90 rounded-lg animate-slideUp">
                {/* Title */}
                <h2 className="text-4xl font-semibold text-center mb-8 animate-fadeInFast">Sign In</h2>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div className="animate-fadeIn">
                        <label className="block text-lg mb-2">Phone / Email</label>
                        <input
                            type="text"
                            placeholder="Phone / Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                            required
                        />
                    </div>
                    <div className="animate-fadeIn">
                        <label className="block text-lg mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 mt-6 bg-orange-500 text-white text-lg font-semibold rounded-md hover:bg-orange-600 transition focus:outline-none focus:ring-2 focus:ring-orange-500 transform hover:scale-105 ease-out animate-fadeIn"
                    >
                        Sign In
                    </button>
                </form>

                {/* Forgot Password */}
                <p className="mt-8 text-center text-gray-400 animate-fadeIn">
                    {' '}
                    <button
                        onClick={() => navigate('/ForgotPassword')}
                        className="text-orange-500 hover:underline"
                    >
                        Mot de passe oublié ?
                    </button>
                </p>


                {/* Sign Up Link */}
                <p className="mt-8 text-center text-gray-400 animate-fadeIn">
                    Don't have an account?{' '}
                    <button
                        onClick={() => navigate('/MultiStepForm')}
                        className="text-orange-500 hover:underline"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
