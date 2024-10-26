import React, { useState } from 'react';
import '../assets/styles/style.css';
import appleLogo from '../assets/images/apple-logo.png';
import facebookLogo from '../assets/images/facebook-logo.png';
import googleLogo from '../assets/images/google-logo.png';

const MultiStepForm = () => {
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

    const nextStep = () => {
        console.log('Current Step:', step);
        console.log('Form Data:', formData);
        if ((selectedOption !== null || step === 1) && step < 8) {
            setStep(step + 1);
            setSelectedOption(null);
        }
    };

    const selectOption = (option, key) => {
        setSelectedOption(option);
        setFormData({ ...formData, [key]: option });
        console.log('Selected Option:', option, 'for key:', key);
    };

    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
        console.log('Input Change:', key, value);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Something went wrong during registration.');
            }

            const data = await response.json();
            console.log('User registered successfully:', data);
            // Redirect to the next page or show a success message
        } catch (error) {
            console.error('Error:', error);
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
                            <input
                                type="tel"
                                placeholder="Phone"
                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                onChange={(e) => handleInputChange('password', e.target.value)}
                            />
                            <div className="flex items-center mt-4">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-sm text-gray-400">By continuing you accept our Privacy Policy</span>
                            </div>
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
                                <button className="text-white">
                                    <img src={appleLogo} alt="Sign in with Apple" className="w-10 h-12" />
                                </button>
                                <button className="text-white">
                                    <img src={facebookLogo} alt="Sign in with Facebook" className="w-10 h-10" />
                                </button>
                                <button className="text-white">
                                    <img src={googleLogo} alt="Sign in with Google" className="w-10 h-10" />
                                </button>
                            </div>
                        </div>
                        <p className="mt-8 text-center text-gray-400">
                            Don't have an account?{' '}
                            <button className="text-orange-500 hover:underline" onClick={() => setStep(2)}>
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
