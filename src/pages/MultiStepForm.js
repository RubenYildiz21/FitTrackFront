import React, { useState } from 'react';
import '../assets/styles/style.css';
import { registerUser } from '../services/authService';
import { validateEmail, validatePassword } from '../utils/validation';
import { useNavigate } from 'react-router-dom';


const MultiStepForm = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState(null);
    const [formData, setFormData] = useState({
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        age: 0,
        trainingLevel: '',
        profilePicture: '', // Stocke le chemin de l’image ici
        gender: '',
        mainGoal: '',
        goalWeight: 0,
        height: 0,
        weight: 0,
        place: ''
    });

    const [errors, setErrors] = useState({ email: '', password: '', checkbox: '' });
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

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

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleImageUpload = (file) => {
        if (file) {
            setFormData({ ...formData, profilePicture: file });
        }
    };


    const handleSubmit = async () => {
        if (!validateStep()) return;

        // Créer un FormData pour envoyer les données, y compris l'image
        const formDataToSend = new FormData();
        formDataToSend.append("firstName", formData.firstName);
        formDataToSend.append("lastName", formData.lastName);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("age", formData.age);
        formDataToSend.append("trainingLevel", formData.trainingLevel);
        formDataToSend.append("gender", formData.gender);
        formDataToSend.append("mainGoal", formData.mainGoal);
        formDataToSend.append("goalWeight", formData.goalWeight);
        formDataToSend.append("height", formData.height);
        formDataToSend.append("weight", formData.weight);
        formDataToSend.append("place", formData.place);

        if (formData.profilePicture) {
            formDataToSend.append("profilePicture", formData.profilePicture);
        }

        for (let [key, value] of formDataToSend.entries()) {
            console.log(key, value);
        }

        try {
            const data = await registerUser(formDataToSend);
            console.log('User registered successfully:', data);
            navigate('/LoaderPage');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderBackButton = () => {
        return (
            step > 1 && (
                <button
                    className="absolute top-4 left-4 flex items-center text-orange-500 hover:text-orange-600"
                    onClick={prevStep}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Retour</span>
                </button>
            )
        );
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 animate-fadeIn">
                        {renderBackButton()}
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
                            <input
                                type="number"
                                placeholder="Age"
                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                onChange={(e) => handleImageUpload(e.target.files[0])}
                            />
                            <div className="flex items-center mt-4">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    onChange={(e) => setIsPrivacyChecked(e.target.checked)}
                                />
                                <span
                                    className="text-sm text-gray-400">By continuing you accept our Privacy Policy</span>
                            </div>
                            {errors.checkbox && <p className="text-red-500 text-sm">{errors.checkbox}</p>}
                        </div>
                        <button
                            className="w-full max-w-md py-4 mt-8 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300"
                            onClick={nextStep}
                        >
                            Sign Up
                        </button>
                        <p className="mt-8 text-center text-gray-400">
                            Already have an account?{' '}
                            <button className="text-orange-500 hover:underline" onClick={() => navigate("/LoginPage")}>
                                Sign In
                            </button>
                        </p>
                    </div>
                );
            case 2:
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 animate-fadeIn">
                        {renderBackButton()}
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
                        {renderBackButton()}
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
                        {renderBackButton()}
                        <h2 className="text-4xl font-bold mb-12">Choose Training Level</h2>
                        <div className="space-y-4 w-full max-w-md">
                            <button
                                className={`w-full py-4 ${selectedOption === 'Beginner' ? 'bg-orange-500 text-white' : 'bg-transparent border-2 border-orange-500 text-white'} font-semibold rounded-md transition duration-300`}
                                onClick={() => selectOption('Beginner', 'trainingLevel')}
                            >
                                Beginner
                            </button>
                            <button
                                className={`w-full py-4 ${selectedOption === 'Irregular training' ? 'bg-orange-500 text-white' : 'bg-transparent border-2 border-orange-500 text-white'} font-semibold rounded-md transition duration-300`}
                                onClick={() => selectOption('Irregular training', 'trainingLevel')}
                            >
                                Irregular Training
                            </button>
                            <button
                                className={`w-full py-4 ${selectedOption === 'Medium' ? 'bg-orange-500 text-white' : 'bg-transparent border-2 border-orange-500 text-white'} font-semibold rounded-md transition duration-300`}
                                onClick={() => selectOption('Medium', 'trainingLevel')}
                            >
                                Medium
                            </button>
                            <button
                                className={`w-full py-4 ${selectedOption === 'Advanced' ? 'bg-orange-500 text-white' : 'bg-transparent border-2 border-orange-500 text-white'} font-semibold rounded-md transition duration-300`}
                                onClick={() => selectOption('Advanced', 'trainingLevel')}
                            >
                                Advanced
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
            case 5:
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 animate-fadeIn">
                        {renderBackButton()}
                        <h2 className="text-4xl font-bold mb-12">Select Height</h2>
                        <div className="space-y-4 w-full max-w-md">
                            <input
                                type="number"
                                placeholder="Height in cm"
                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                            />
                        </div>
                        <button
                            className="w-full max-w-md py-4 mt-8 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300"
                            onClick={nextStep}
                        >
                            Continue
                        </button>
                    </div>
                );
            case 6:
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 animate-fadeIn">
                        {renderBackButton()}
                        <h2 className="text-4xl font-bold mb-12">Select Weight</h2>
                        <div className="space-y-4 w-full max-w-md">
                            <input
                                type="number"
                                placeholder="Weight in kg"
                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                onChange={(e) => handleInputChange('weight', parseInt(e.target.value))}
                            />
                        </div>
                        <button
                            className="w-full max-w-md py-4 mt-8 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300"
                            onClick={nextStep}
                        >
                            Continue
                        </button>
                    </div>
                );
            case 7:
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 animate-fadeIn">
                        {renderBackButton()}
                        <h2 className="text-4xl font-bold mb-12">Enter Your Goal Weight</h2>
                        <div className="space-y-4 w-full max-w-md">
                            <input
                                type="number"
                                placeholder="Goal Weight in kg"
                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                onChange={(e) => handleInputChange('goalWeight', parseInt(e.target.value))}
                            />
                        </div>
                        <button
                            className="w-full max-w-md py-4 mt-8 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300"
                            onClick={nextStep}
                        >
                            Continue
                        </button>
                    </div>
                );
            case 8:
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 animate-fadeIn">
                        {renderBackButton()}
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
            case 9:
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 animate-fadeIn">
                        {renderBackButton()}
                        <h2 className="text-4xl font-bold mb-12">Review and Submit</h2>
                        <div className="space-y-4 w-full max-w-md">
                            <p className="text-lg">Please review your information before submitting:</p>
                            <ul className="text-left">
                                <li><strong>First Name:</strong> {formData.firstName}</li>
                                <li><strong>Last Name:</strong> {formData.lastName}</li>
                                <li><strong>Email:</strong> {formData.email}</li>
                                <li><strong>Age:</strong> {formData.age}</li>
                                <li><strong>Training Level:</strong> {formData.trainingLevel}</li>
                                <li>
                                    <strong>Profile Picture:</strong>
                                    {formData.profilePicture ? (
                                        <img
                                            src={URL.createObjectURL(formData.profilePicture)}
                                            alt="Profile"
                                            style={{width: "100px", height: "100px", objectFit: "cover"}}
                                        />
                                    ) : (
                                        "No image uploaded"
                                    )}
                                </li>

                                <li><strong>Gender:</strong> {formData.gender}</li>
                                <li><strong>Main Goal:</strong> {formData.mainGoal}</li>
                                <li><strong>Goal Weight:</strong> {formData.goalWeight} kg</li>
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
