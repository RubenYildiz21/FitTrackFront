import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchExercises } from '../services/exerciseService';
import Navbar from './shared/Navbar';

const ExerciseExplorationPage = () => {
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
        {exercises.map((exercise) => (
          <div 
            key={exercise.id}
            className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex flex-col p-4">
              <div className="flex space-x-4 items-center mb-4">
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
                  <p className="text-gray-300 text-sm">
                    {exercise.description}
                  </p>
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <iframe 
                  width="560" 
                  height="315" 
                  src={exercise.lienVideo.replace("watch?v=", "embed/")} 
                  title="Exercise Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ExerciseExplorationPage;