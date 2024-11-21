import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createChallenge } from "../services/challengeService";
import Navbar from "./shared/Navbar";
import {getLoggedInUser} from "../services/authService";

const CreateChallenge = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        idUser: 0,
        title: "",
        description: "",
        exercise: "",
        beginingDate: "",
        endingDate: "",
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    /**
     * Handles form input changes.
     * @param {Object} e - Event object for the input change.
     */
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    /**
     * Validates form fields and returns an object containing validation errors.
     * @returns {Object} - Validation errors.
     */
    const validateForm = () => {
        const validationErrors = {};
        if (!formData.title) validationErrors.title = "Title is required";
        if (!formData.exercise) validationErrors.exercise = "Exercise is required";
        if (!formData.beginingDate) validationErrors.beginingDate = "Beginning date is required";
        if (!formData.endingDate) validationErrors.endingDate = "Ending date is required";

        return validationErrors;
    };

    /**
     * Handles form submission.
     * @param {Object} e - Event object for the form submission.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage("");

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            formData.idUser = getLoggedInUser().id;
            await createChallenge(formData);
            setSuccessMessage("Challenge created successfully!");
            setTimeout(() => navigate(-1), 1000);
        } catch (error) {
            console.error("Error creating challenge:", error);
            setErrors({ server: "Failed to create challenge. Please try again later." });
        }
    };

    return (
        <div className="relative flex flex-col min-h-screen bg-black text-white">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-20">
                <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md p-10 bg-black bg-opacity-90 rounded-lg">
                        <h2 className="text-4xl font-semibold text-center mb-8">Créer un défi</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {successMessage && (
                                <p className="text-green-500 text-center">{successMessage}</p>
                            )}
                            {errors.server && (
                                <p className="text-red-500 text-center">{errors.server}</p>
                            )}
                            <div>
                                <label htmlFor="title" className="block text-lg mb-2">
                                    Titre
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm">{errors.title}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-lg mb-2">
                                    Description
                                </label>
                                <textarea
                                    rows="4"
                                    cols="50"
                                    id="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="exercise" className="block text-lg mb-2">
                                    Exercice
                                </label>
                                <select
                                    id="exercise"
                                    value={formData.exercise}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                                >
                                    <option value="">Select an exercise</option>
                                    <option value="pompes-diamant">Pompes diamant</option>
                                </select>
                                {errors.exercise && (
                                    <p className="text-red-500 text-sm">{errors.exercise}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="beginingDate" className="block text-lg mb-2">
                                    Date de début du défi
                                </label>
                                <input
                                    type="date"
                                    id="beginingDate"
                                    value={formData.beginingDate}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                                />
                                {errors.beginingDate && (
                                    <p className="text-red-500 text-sm">{errors.beginingDate}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="endingDate" className="block text-lg mb-2">
                                    Date de fin du défi
                                </label>
                                <input
                                    type="date"
                                    id="endingDate"
                                    value={formData.endingDate}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                                />
                                {errors.endingDate && (
                                    <p className="text-red-500 text-sm">{errors.endingDate}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 mt-6 bg-orange-500 text-white text-lg font-semibold rounded-md hover:bg-orange-600 transition focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                Créer défi
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Fixed Navbar */}
            <Navbar />
        </div>
    );
};

export default CreateChallenge;
