import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/styles/style.css';
import { updateGoals } from '../services/userService';
import Navbar from "./shared/Navbar";

const EditGoals = () => {
  const [goalWeight, setGoalWeight] = useState('');
  const [personalObjective, setPersonalObjective] = useState('');
  const [place, setPlace] = useState('');
  const [trainingLevel, setTrainingLevel] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserGoals = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
          setGoalWeight(user.goalWeight || '');
          setPersonalObjective(user.mainGoal || '');
          setPlace(user.place || '');
          setTrainingLevel(user.trainingLevel || '');
        }
      } catch (error) {
        console.error('Error fetching user goals:', error);
        setError('Failed to load user goals');
      }
    };

    fetchUserGoals();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedGoals = {
      goalWeight,
      mainGoal: personalObjective, // Assurez-vous que les noms correspondent à votre API
      place,
      trainingLevel
    };

    try {
      await updateGoals(updatedGoals);
      
      // Mise à jour du sessionStorage
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      const updatedUser = {
        ...user,
        ...updatedGoals
      };
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
    }
      
      navigate(-1);
    } catch (error) {
      console.error('Error updating goals:', error);
      setError('Failed to update goals');
    }
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 animate-fadeIn">
        <Navbar/>
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