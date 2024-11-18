// WorkoutForm.js
import React, { useState, useEffect } from 'react';
import ExerciseList from './ExerciseList';
import FilterSection from './FilterSection';
import { createWorkoutSession } from '../services/workoutService';
import Navbar from './shared/Navbar';
import Modal from 'react-modal'; // Import de react-modal

// Définir l'élément racine pour react-modal
Modal.setAppElement('#root');

const WorkoutForm = () => {
  const [sessionName, setSessionName] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sessionName || !sessionDate || selectedExercises.length === 0) {
      setError('Veuillez remplir tous les champs requis');
      return;
    }

    try {
      const workoutSession = {
        name: sessionName,
        date: sessionDate,
        exercises: selectedExercises.map(ex => ({
          ...ex,
          sets: ex.sets || [{ reps: 0, weight: 0 }] // Assure qu'il y a au moins une série
        }))
      };

      console.log('Session à créer:', workoutSession); // Pour déboguer
      
      await createWorkoutSession(workoutSession);
      // Redirection ou message de succès
      alert('Séance enregistrée avec succès !');
      // Optionnel : Réinitialiser le formulaire
      setSessionName('');
      setSessionDate('');
      setSelectedExercises([]);
      setActiveFilters([]);
      setError('');
    } catch (err) {
      setError('Erreur lors de la création de la séance');
      console.error('Error creating session:', err);
    }
  };

  const openModal = (videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideoUrl('');
  };

  const removeExercise = (idExercice) => {
    setSelectedExercises(selectedExercises.filter(ex => ex.idExercice !== idExercice));
  };

  const updateSet = (idExercice, newSets) => {
    setSelectedExercises(selectedExercises.map(ex => 
      ex.idExercice === idExercice ? { ...ex, sets: newSets } : ex
    ));
  };

  return (
    <div className="min-h-screen bg-black p-4 text-white mb-20">
      <Navbar />
      <h1 className="text-2xl font-bold mb-6">
        Nouvelle séance
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6 mb-6">
          <input
            type="text"
            placeholder="Nom de la séance"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            className="w-full p-3 rounded bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="date"
            value={sessionDate}
            onChange={(e) => setSessionDate(e.target.value)}
            className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <FilterSection 
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />

        {/* Liste des exercices sélectionnés */}
        {selectedExercises.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Exercices sélectionnés</h2>
            <div className="space-y-4">
              {selectedExercises.map((exercise) => {
                console.log('Exercice sélectionné:', exercise); // Log pour vérifier videoUrl
                return (
                  <div key={exercise.idExercice} className="bg-zinc-800 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{exercise.nom}</h3>
                      <button
                        type="button"
                        onClick={() => removeExercise(exercise.idExercice)}
                        className="text-red-500 hover:text-red-400"
                      >
                        Supprimer
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newSets = [...(exercise.sets || []), { reps: 0, weight: 0 }];
                        updateSet(exercise.idExercice, newSets);
                      }}
                      className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-500 transition-colors text-sm"
                    >
                      + Ajouter une série
                    </button>
                    {exercise.sets?.map((set, index) => (
                      <div key={index} className="flex gap-4 mt-2">
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-400 mb-1">Répétitions</label>
                          <input
                            type="number"
                            min="0"
                            placeholder="Nombre"
                            value={set.reps}
                            onChange={(e) => {
                              const newSets = exercise.sets.map((s, i) => 
                                i === index ? { ...s, reps: parseInt(e.target.value) || 0 } : s
                              );
                              updateSet(exercise.idExercice, newSets);
                            }}
                            className="w-24 p-2 rounded bg-zinc-700"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-400 mb-1">Poids (kg)</label>
                          <input
                            type="number"
                            min="0"
                            step="0.5"
                            placeholder="Poids"
                            value={set.weight}
                            onChange={(e) => {
                              const newSets = exercise.sets.map((s, i) => 
                                i === index ? { ...s, weight: parseFloat(e.target.value) || 0 } : s
                              );
                              updateSet(exercise.idExercice, newSets);
                            }}
                            className="w-24 p-2 rounded bg-zinc-700"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <ExerciseList
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
          filters={activeFilters}
          openModal={openModal} // Passez la fonction openModal en prop
        />

        {error && (
          <div className="mt-4 text-red-500">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full mt-6 p-3 bg-orange-500 text-white rounded font-semibold hover:bg-orange-600 transition-colors"
        >
          Enregistrer la séance
        </button>
      </form>

      {/* Modal pour la vidéo */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Vidéo de l'Exercice"
        className="bg-zinc-800 rounded-lg p-6 max-w-3xl mx-auto mt-20 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <button onClick={closeModal} className="text-white text-xl mb-4">&times;</button>
        {currentVideoUrl ? (
          // Afficher le GIF avec une balise img
          <img
            src={currentVideoUrl}
            alt="Vidéo de l'Exercice"
            className="w-full h-auto rounded"
          />
        ) : (
          <p className="text-white">Aucune vidéo disponible.</p>
        )}
      </Modal>
    </div>
  );
};

export default WorkoutForm;
