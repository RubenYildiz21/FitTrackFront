import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/style.css';

const EditGoals = () => {
  const [goalWeight, setGoalWeight] = useState('70');
  const [personalObjective, setPersonalObjective] = useState('Perdre du poids');
  const [place, setPlace] = useState('À la maison');
  const [trainingLevel, setTrainingLevel] = useState('Avancé');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedGoals = { goalWeight, personalObjective, place, trainingLevel };
    console.log(updatedGoals);
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
              <label className="block text-lg mb-2">Poids cible (kg)</label>
              <input
                  type="number"
                  value={goalWeight}
                  onChange={(e) => setGoalWeight(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                  placeholder="Poids cible (kg)"
                  required
              />
            </div>

            <div className="animate-fadeIn">
              <label className="block text-lg mb-2">Objectif personnel</label>
              <select
                  value={personalObjective}
                  onChange={(e) => setPersonalObjective(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                  required
              >
                <option>Perdre du poids</option>
                <option>Gagner de la masse musculaire</option>
                <option>Devenir plus fort</option>
                <option>Garder la forme</option>
              </select>
            </div>

            <div className="animate-fadeIn">
              <label className="block text-lg mb-2">Lieu d'entraînement</label>
              <select
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                  required
              >
                <option>À la maison</option>
                <option>À la salle de sport</option>
              </select>
            </div>

            <div className="animate-fadeIn">
              <label className="block text-lg mb-2">Niveau d'entraînement</label>
              <select
                  value={trainingLevel}
                  onChange={(e) => setTrainingLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                  required
              >
                <option>Débutant</option>
                <option>Entraînement irrégulier</option>
                <option>Intermédiaire</option>
                <option>Avancé</option>
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
