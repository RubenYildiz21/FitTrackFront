import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/style.css';
import { updateGoals } from '../services/userService';

const EditGoals = () => {
  const [goalWeight, setGoalWeight] = useState('70 kg');
  const [personalObjective, setPersonalObjective] = useState('Loose weight');
  const [place, setPlace] = useState('At home');
  const [trainingLevel, setTrainingLevel] = useState('Advanced');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedGoals = { goalWeight, personalObjective, place, trainingLevel };
    try{
      await updateGoals(updatedGoals); 
      console.log('Goals updated successfully:', updatedGoals);
      navigate(-1);
    }catch (error) {
      console.error('Error updating profile:', error);
    }
    
    console.log(updatedGoals);
    // Ici, tu pourrais envoyer les données mises à jour à ton backend
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 animate-fadeIn">
        {/* Container */}
        <div className="w-full max-w-lg p-10 bg-black bg-opacity-90 rounded-lg animate-slideUp">
          {/* Header with back button */}
          <div className="flex items-center mb-10 animate-fadeInFast">
            <button
                onClick={() => navigate(-1)}
                className="text-white hover:text-orange-500 transition duration-200 focus:outline-none"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h2 className="flex-grow text-center text-3xl font-bold animate-fadeInFast">
              Edit Goals
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-fadeIn">
              <label className="block text-lg mb-2">Goal weight</label>
              <input
                  type="text"
                  value={goalWeight}
                  onChange={(e) => setGoalWeight(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                  placeholder="Goal weight"
                  required
              />
            </div>

            <div className="animate-fadeIn">
              <label className="block text-lg mb-2">Personal objective</label>
              <select
                  value={personalObjective}
                  onChange={(e) => setPersonalObjective(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                  required
              >
                <option>Loose weight</option>
                <option>Gain mass muscle</option>
                <option>Get stronger</option>
                <option>Keep fit</option>
              </select>
            </div>

            <div className="animate-fadeIn">
              <label className="block text-lg mb-2">Place</label>
              <select
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                  required
              >
                <option>At home</option>
                <option>Gym</option>
              </select>
            </div>

            <div className="animate-fadeIn">
              <label className="block text-lg mb-2">Training level</label>
              <select
                  value={trainingLevel}
                  onChange={(e) => setTrainingLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                  required
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <button
                type="submit"
                className="w-full py-4 mt-6 bg-orange-500 text-white text-lg font-semibold rounded-md hover:bg-orange-600 transition focus:outline-none focus:ring-2 focus:ring-orange-500 transform hover:scale-105 ease-out animate-fadeIn"
            >
              Sauvegarder
            </button>
          </form>
        </div>
      </div>
  );
};

export default EditGoals;