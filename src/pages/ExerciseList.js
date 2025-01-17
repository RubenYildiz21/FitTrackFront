// ExerciseList.js
import React, { useState, useEffect } from 'react';
import { fetchExercises } from '../services/exerciseService';

const ExerciseList = ({ selectedExercises, setSelectedExercises, filters, openModal }) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        setLoading(true);
        const data = await fetchExercises();
        setExercises(data);
      } catch (err) {
        setError('Erreur lors du chargement des exercices');
        console.error('Error loading exercises:', err);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  const filteredExercises = exercises.filter(exercise => {
    if (filters.length === 0) return true;

    return filters.some(filter => {
      if (typeof exercise.equipementNecessaire !== 'string') {
        console.warn(`Exercise ${exercise.nom} has an invalid equipementNecessaire type. It should be a string.`);
        return false;
      }

      return exercise.equipementNecessaire.toLowerCase() === filter.toLowerCase();
    });
  });

  const addExercise = (exercise) => {
    console.log('Ajout de l\'exercice:', exercise); // Log pour vérifier les données
    const isAlreadySelected = selectedExercises.some(ex => ex.idExercice === exercise.idExercice);
    if (!isAlreadySelected) {
      setSelectedExercises([...selectedExercises, {
        ...exercise, sets: [{ reps: 0, weight: 0 }],
        tempsRepos: "00:00:30", // Initialiser le temps de repos
        tempsDeRepetition: "00:01:00"
      }]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      {filteredExercises.map((exercise) => (
        <div
          key={exercise.idExercice}
          className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="flex justify-between items-center p-4">
            <div className="flex space-x-4 items-center">
              {exercise.icon ? (
                exercise.icon
              ) : (
                <div className="w-24 h-16 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              <div>
                <h3 className="text-white text-lg font-semibold">
                  {exercise.nom}
                </h3>
                <p className="text-gray-400 text-sm">
                  {exercise.description}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              {exercise.lienVideo && (
                <button
                  onClick={() => openModal(exercise.lienVideo)}
                  className="px-3 py-1 bg-orange-400 text-white rounded hover:bg-orange-500 transition-colors text-sm"
                >
                  Exemple
                </button>
              )}
              <button
                onClick={() => addExercise(exercise)}
                className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-500 transition-colors text-sm"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExerciseList;
