import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./shared/Navbar"; 
import apiRequest from '../services/api';

const EditGoals = () => {
    const [setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [goalWeight, setGoalWeight] = useState('');
    const [mainGoal, setMainGoal] = useState('');
    const [place, setPlace] = useState('');
    const [trainingLevel, setTrainingLevel] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserGoals = async () => {
            try {
                const userString = sessionStorage.getItem('user');
                if (userString) {
                    const user = JSON.parse(userString);
                    setUser(user);
                    setUserId(user.id);
                    setGoalWeight(user.goalWeight || '');
                    setMainGoal(user.mainGoal || '');
                    setPlace(user.place || '');
                    setTrainingLevel(user.trainingLevel || '');
                } else {
                    console.error("Aucun utilisateur trouvé dans sessionStorage");
                    setError("User not logged in.");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des objectifs utilisateur", error);
                setError("Could not fetch user goals.");
            }
        };

        fetchUserGoals();
    }, []);

    const handleUpdateGoals = async (e) => {
      e.preventDefault();
      try {
          const updatedGoals = {
              goalWeight,
              mainGoal,
              place,
              trainingLevel,
          };
  
          const userId = JSON.parse(sessionStorage.getItem('user')).id;
  
          // Utilisez apiRequest directement
          await apiRequest(`/users/${userId}/goals`, 'PUT', updatedGoals);
  
          // Mettez à jour l'utilisateur dans sessionStorage
          const user = JSON.parse(sessionStorage.getItem('user'));
          const updatedUser = {
              ...user,
              ...updatedGoals,
          };
          sessionStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
  
          navigate('/Profil');
      } catch (error) {
          console.error("Erreur lors de la mise à jour des objectifs", error);
          setError("Could not update goals.");
      }
  };
  

    if (error) return <div className="text-red-500">{error}</div>;
    if (!user) return <div className="text-gray-500">Loading...</div>;

    return (
        <div className="bg-black text-white min-h-screen p-6 mb-10">
            <Navbar/>
            <button
                className="text-gray-400 hover:text-white mb-4 text-2xl p-2"
                onClick={() => navigate(-1)}
            >
                &#8592; {/* Flèche gauche */}
            </button>
            <form onSubmit={handleUpdateGoals}>
                <div className="mb-4">
                    <label className="block text-white mb-2">Goal Weight (kg)</label>
                    <input
                        type="number"
                        value={goalWeight}
                        onChange={(e) => setGoalWeight(e.target.value)}
                        className="w-full px-4 py-2 text-white bg-gray-800 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2">Main Goal</label>
                    <select
                        value={mainGoal}
                        onChange={(e) => setMainGoal(e.target.value)}
                        className="w-full px-4 py-2 text-white bg-gray-800 rounded-md"
                        required
                    >
                        <option value="">Select a goal</option>
                        <option value="Loose weight">Loose weight</option>
                        <option value="Gain mass muscle">Gain mass muscle</option>
                        <option value="Get stronger">Get stronger</option>
                        <option value="Keep fit">Keep fit</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2">Place</label>
                    <select
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        className="w-full px-4 py-2 text-white bg-gray-800 rounded-md"
                        required
                    >
                        <option value="">Select a place</option>
                        <option value="At home">At home</option>
                        <option value="Gym">Gym</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2">Training Level</label>
                    <select
                        value={trainingLevel}
                        onChange={(e) => setTrainingLevel(e.target.value)}
                        className="w-full px-4 py-2 text-white bg-gray-800 rounded-md"
                        required
                    >
                        <option value="">Select a level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-400 py-2 px-4 rounded w-full"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditGoals;
