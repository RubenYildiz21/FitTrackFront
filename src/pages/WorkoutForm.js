import React, { useState } from 'react';
import ExerciseList from './ExerciseList';
import FilterSection from './FilterSection';

const WorkoutForm = () => {
  const [sessionName, setSessionName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sessionName || selectedExercises.length === 0) {
      setError('Veuillez remplir tous les champs requis');
      return;
    }
    // TODO: Envoyer les données au backend
  };

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <h1 className="text-2xl font-bold mb-6">
        Nouvelle séance
      </h1>

      <input
        type="text"
        placeholder="Nom de la séance"
        value={sessionName}
        onChange={(e) => setSessionName(e.target.value)}
        className="w-full p-3 mb-6 rounded bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      <FilterSection 
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />

      <ExerciseList
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
        filters={activeFilters}
      />

      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full mt-6 p-3 bg-orange-500 text-white rounded font-semibold hover:bg-orange-600 transition-colors"
      >
        Enregistrer la séance
      </button>
    </div>
  );
};

export default WorkoutForm; 