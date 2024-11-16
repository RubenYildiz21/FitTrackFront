import React, { useState, useEffect } from 'react';
import { fetchExercises } from '../services/exerciseService';

const ExerciseList = ({ selectedExercises, setSelectedExercises, filters }) => {
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
    if(filters.length === 0) return true;

    return filters.some(filter => {
      if(!Array.isArray(exercise.equipment)){
        console.warn(`Exercise ${exercise.name} has an invalid equipment type. It should be an array.`)
        return false;
      }

      return exercise.equipment.some(
        eq => eq.toLowerCase() === filter.toLowerCase()
      );
    });
  });

  const addExercise = (exercise) => {
    if (!selectedExercises.find(ex => ex.id === exercise.id)) {
      setSelectedExercises([...selectedExercises, exercise]);
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
          key={exercise.id}
          className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="flex justify-between items-center p-4">
            <div className="flex space-x-4 items-center">
              {exercise.icon ? (
                exercise.icon
              ) : (
                <div className="w-24 h-16 bg-zinc-700 rounded flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              <div>
                <h3 className="text-white text-lg font-semibold">
                  {exercise.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {exercise.duration}
                </p>
              </div>
            </div>
            <button 
              onClick={() => addExercise(exercise)}
              className="text-orange-500 hover:text-orange-400 transition-colors text-xl font-bold"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExerciseList; 