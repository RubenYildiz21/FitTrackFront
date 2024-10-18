import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Utilisé pour naviguer en arrière

const EditGoals = () => {
  const [goalWeight, setGoalWeight] = useState('70');
  const [personalObjective, setPersonalObjective] = useState('Loose weight');
  const [place, setPlace] = useState('At home');
  const [trainingLevel, setTrainingLevel] = useState('Advanced');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedGoals = { goalWeight, personalObjective, place, trainingLevel };
    console.log(updatedGoals);
  };

  return (
    <div className="min-h-screen bg-black p-4 flex flex-col justify-start">
      {/* Flèche de retour */}
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {/* Titre centré */}
        <h2 className="text-white text-2xl font-semibold text-center flex-grow">Edit Goals</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg w-full max-w-lg mx-auto flex flex-col space-y-4"
      >
        <label className="block text-white mb-2">Goal Weight</label>
        <input
          type="number"
          value={goalWeight}
          onChange={(e) => setGoalWeight(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
          placeholder="Enter goal weight"
        />

        <label className="block text-white mb-2">Personal Objective</label>
        <select
          value={personalObjective}
          onChange={(e) => setPersonalObjective(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white rounded"
        >
          <option>Loose weight</option>
          <option>Gain muscle mass</option>
          <option>Get stronger</option>
          <option>Keep fit</option>
        </select>

        <label className="block text-white mb-2">Place</label>
        <select
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white rounded"
        >
          <option>At home</option>
          <option>At the gym</option>
        </select>

        <label className="block text-white mb-2">Training Level</label>
        <select
          value={trainingLevel}
          onChange={(e) => setTrainingLevel(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white rounded"
        >
          <option>Beginner</option>
          <option>Irregular trainer</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <button
          type="submit"
          className="w-full p-3 mt-4 bg-orange-600 text-white rounded"
        >
          Sauvegarder
        </button>
      </form>
    </div>
  );
};

export default EditGoals;
