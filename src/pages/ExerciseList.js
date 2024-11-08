import React, { useState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
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

  const filteredExercises = filters.length > 0
    ? exercises.filter(ex => ex.equipment.some(eq => filters.includes(eq)))
    : exercises;

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
              <img 
                src={exercise.image} 
                alt={exercise.name}
                className="w-24 h-16 object-cover rounded"
              />
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