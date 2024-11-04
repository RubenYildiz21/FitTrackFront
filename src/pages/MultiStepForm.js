import React, { useState } from 'react';
import '../assets/styles/style.css';
import appleLogo from '../assets/images/apple-logo.png';
import facebookLogo from '../assets/images/facebook-logo.png';
import googleLogo from '../assets/images/google-logo.png';
import { registerUser } from '../services/authService';
import { validateEmail, validatePassword } from '../utils/validation';
import { useNavigate } from 'react-router-dom';
import { googleLogin } from '../services/authService';
import { GoogleLogin } from '@react-oauth/google';

const MultiStepForm = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState(null);
    const [formData, setFormData] = useState({
        idUser: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
        mainGoal: '',
        height: 0,
        weight: 0,
        place: ''
    });

    const [errors, setErrors] = useState({ email: '', password: '', checkbox: '' });
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

    // La fonction selectOption pour gérer la sélection des options
    const selectOption = (value, field) => {
        setSelectedOption(value);
        setFormData({ ...formData, [field]: value });
    };

    const validateStep = () => {
        let isValid = true;
        const newErrors = { email: '', password: '', checkbox: '' };

        if (!validateEmail(formData.email)) {
            newErrors.email = "Format d'email invalide.";
            isValid = false;
        }

        if (!validatePassword(formData.password)) {
            newErrors.password = "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.";
            isValid = false;
        }

        if (step === 1 && !isPrivacyChecked) {
            newErrors.checkbox = "Vous devez accepter notre politique de confidentialité.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const nextStep = () => {
        if (validateStep()) {
            setStep(step + 1);
            setSelectedOption(null);
        }
    };

    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = async () => {
        if (!validateStep()) return;

        try {
            const data = await registerUser(formData);
            console.log('User registered successfully:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            console.log('Google response:', credentialResponse);
            const response = await googleLogin(credentialResponse);
            console.log('Backend response:', response);
            
            if (response.status === 'success') {
                navigate('/NotFound');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrors('Failed to authenticate with Google. Please try again.');
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 animate-fadeIn">
                        <h2 className="text-4xl font-bold mb-12">Sign Up</h2>
                        <div className="space-y-4 w-full max-w-md">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                onChange={(e) => handleInputChange('password', e.target.value)}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            <div className="flex items-center mt-4">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    onChange={(e) => setIsPrivacyChecked(e.target.checked)}
                                />
                                <span className="text-sm text-gray-400">By continuing you accept our Privacy Policy</span>
                            </div>
                            {errors.checkbox && <p className="text-red-500 text-sm">{errors.checkbox}</p>}
                        </div>
                        <button
                            className="w-full max-w-md py-4 mt-8 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300"
                            onClick={nextStep}
                        >
                            Sign Up
                        </button>
                        <div className="mt-8 text-center">
                            <p className="text-gray-400 mb-4">Sign in with</p>
                            <div className="flex justify-center space-x-6">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={(error) => {
                                        console.error('Google OAuth Error:', error);
                                        setErrors(`Google OAuth Error: ${error.message || 'Unknown error'}`);
                                    }}
                                    useOneTap
                                />
                            </div>
                        </div>
                        <p className="mt-8 text-center text-gray-400">
                            Don't have an account?{' '}
                            <button className="text-orange-500 hover:underline" onClick={() => navigate("/LoginPage")}>
                                Sign In
                            </button>
                        </p>
                    </div>
                );
            case 2:
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 animate-fadeIn">
                        <h2 className="text-4xl font-bold mb-12">Choose Gender</h2>
                        <div className="space-y-4 w-full max-w-md">
                            <button
                                className={`w-full py-4 ${selectedOption === 'Woman' ? 'bg-orange-500 text-white' : 'bg-transparent border-2 border-orange-500 text-white'} font-semibold rounded-md transition duration-300`}
                                onClick={() => selectOption('Woman', 'gender')}
                            >
                                Woman
                            </button>
                            <button
                                className={`w-full py-4 ${selectedOption === 'Man' ? 'bg-orange-500 text-white' : 'bg-transparent border-2 border-orange-500 text-white'} font-semibold rounded-md transition duration-300`}
                                onClick={() => selectOption('Man', 'gender')}
                            >
                                Man
                            </button>
                            <button
                                className={`w-full py-4 ${selectedOption === 'Gender neutral' ? 'bg-orange-500 text-white' : 'bg-transparent border-2 border-orange-500 text-white'} font-semibold rounded-md transition duration-300`}
                                onClick={() => selectOption('Gender neutral', 'gender')}
                            >
                                Gender Neutral
                            </button>
                        </div>
                        <button
                            className={`w-full max-w-md py-4 mt-12 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300 ${selectedOption ? '' : 'opacity-50 cursor-not-allowed'}`}
                            onClick={nextStep}
                            disabled={!selectedOption}
                        >
                            Continue
                        </button>
                    </div>
                );
            case 3:
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 animate-fadeIn">
                        <h2 className="text-4xl font-bold mb-12">Choose Main Goal</h2>
                        <div className="space-y-4 w-full max-w-md">
                            <button
                                className={`w-full py-4 ${selectedOption === 'Lose weight' ? 'bg-orange-500 text-white' : 'bg-transparent border-2 border-orange-500 text-white'} font-semibold rounded-md transition duration-300`}
                                onClick={() => selectOption('Lose weight', 'mainGoal')}
                            >
                                Lose Weight
                            </button>
                            <button
                                className={`w-full py-4 ${selectedOption === 'Keep fit' ? 'bg-orange-500 text-white' : 'bg-transparent border-2 border-orange-500 text-white'} font-semibold rounded-md transition duration-300`}
                                onClick={() => selectOption('Keep fit', 'mainGoal')}
                            >
                                Keep Fit
                            </button>
                            <button
                                className={`w-full py-4 ${selectedOption === 'Get stronger' ? 'bg-orange-500 text-white' : 'bg-transparent border-2 border-orange-500 text-white'} font-semibold rounded-md transition duration-300`}
                                onClick={() => selectOption('Get stronger', 'mainGoal')}
                            >
                                Get Stronger
                            </button>
                            <button
                                className={`w-full py-4 ${selectedOption === 'Gain muscle mass' ? 'bg-orange-500 text-white' : 'bg-transparent border-2 border-orange-500 text-white'} font-semibold rounded-md transition duration-300`}
                                onClick={() => selectOption('Gain muscle mass', 'mainGoal')}
                            >
                                Gain Muscle Mass
                            </button>
                        </div>
                        <button
                            className={`w-full max-w-md py-4 mt-12 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300 ${selectedOption ? '' : 'opacity-50 cursor-not-allowed'}`}
                            onClick={nextStep}
                            disabled={!selectedOption}
                        >
                            Continue
                        </button>
                    </div>
                );
            case 4:
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 animate-fadeIn">
                        <h2 className="text-4xl font-bold mb-12">Select Height</h2>
                        <div className="flex space-x-4 mb-6">
                            <button className={`px-4 py-2 ${selectedOption === 'Feet' ? 'bg-orange-500 text-white' : 'bg-transparent border-2 border-orange-500 text-white'} rounded-md transition duration-300`} onClick={() => selectOption('Feet', 'heightUnit')}>Feet</button>
                            <button className={`px-4 py-2 ${selectedOption === 'Centimeter' ? 'bg-orange-500 text-white' : 'bg-transparent border-2 border-orange-500 text-white'} rounded-md transition duration-300`} onClick={() => selectOption('Centimeter', 'heightUnit')}>Centimeter</button>
                        </div>
                        <input type="number" className="w-full max-w-xs px-4 py-4 mb-8 bg-gray-800 text-white rounded-md" placeholder="Enter height" onChange={(e) => handleInputChange('height', parseInt(e.target.value))} />
                        <button
                            className={`w-full max-w-md py-4 mt-12 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300 ${selectedOption ? '' : 'opacity-50 cursor-not-allowed'}`}
                            onClick={nextStep}
                            disabled={!selectedOption}
                        >
                            Continue
                        </button>
                    </div>
                );
            case 5:
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 animate-fadeIn">
                        <h2 className="text-4xl font-bold mb-12">Select Weight</h2>
                        <div className="flex space-x-4 mb-6">
                            <button className={`px-4 py-2 ${selectedOption === 'Pound' ? 'bg-orange-500 text-white' : 'bg-transparent border-2 border-orange-500 text-white'} rounded-md transition duration-300`} onClick={() => selectOption('Pound', 'weightUnit')}>Pound</button>
                            <button className={`px-4 py-2 ${selectedOption === 'Kilogram' ? 'bg-orange-500 text-white' : 'bg-transparent border-2 border-orange-500 text-white'} rounded-md transition duration-300`} onClick={() => selectOption('Kilogram', 'weightUnit')}>Kilogram</button>
                        </div>
                        <input type="number" className="w-full max-w-xs px-4 py-4 mb-8 bg-gray-800 text-white rounded-md" placeholder="Enter weight" onChange={(e) => handleInputChange('weight', parseInt(e.target.value))} />
                        <button
                            className={`w-full max-w-md py-4 mt-12 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300 ${selectedOption ? '' : 'opacity-50 cursor-not-allowed'}`}
                            onClick={nextStep}
                            disabled={!selectedOption}
                        >
                            Continue
                        </button>
                    </div>
                );
            case 6:
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 animate-fadeIn">
                        <h2 className="text-4xl font-bold mb-12">Choose Your Place</h2>
                        <div className="space-y-4 w-full max-w-md">
                            <button
                                className={`w-full py-4 ${selectedOption === 'At home' ? 'bg-orange-500 text-white' : 'bg-transparent border-2 border-orange-500 text-white'} font-semibold rounded-md transition duration-300`}
                                onClick={() => selectOption('At home', 'place')}
                            >
                                At Home
                            </button>
                            <button
                                className={`w-full py-4 ${selectedOption === 'Gym' ? 'bg-orange-500 text-white' : 'bg-transparent border-2 border-orange-500 text-white'} font-semibold rounded-md transition duration-300`}
                                onClick={() => selectOption('Gym', 'place')}
                            >
                                Gym
                            </button>
                        </div>
                        <button
                            className={`w-full max-w-md py-4 mt-12 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300 ${selectedOption ? '' : 'opacity-50 cursor-not-allowed'}`}
                            onClick={nextStep}
                            disabled={!selectedOption}
                        >
                            Continue
                        </button>
                    </div>
                );
            case 7:
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 animate-fadeIn">
                        <h2 className="text-4xl font-bold mb-12">Review and Submit</h2>
                        <div className="space-y-4 w-full max-w-md">
                            <p className="text-lg">Please review your information before submitting:</p>
                            <ul className="text-left">
                                <li><strong>First Name:</strong> {formData.firstName}</li>
                                <li><strong>Last Name:</strong> {formData.lastName}</li>
                                <li><strong>Email:</strong> {formData.email}</li>
                                <li><strong>Gender:</strong> {formData.gender}</li>
                                <li><strong>Main Goal:</strong> {formData.mainGoal}</li>
                                <li><strong>Height:</strong> {formData.height} cm</li>
                                <li><strong>Weight:</strong> {formData.weight} kg</li>
                                <li><strong>Place:</strong> {formData.place}</li>
                            </ul>
                        </div>
                        <button
                            className="w-full max-w-md py-4 mt-8 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                );
            default:
                return <div className="text-white">Invalid Step</div>;
        }
    };

    return renderStep();
};

export default MultiStepForm;
