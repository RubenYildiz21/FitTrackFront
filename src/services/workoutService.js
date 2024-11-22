// src/services/workoutService.js
import apiRequest from './api'; // Assurez-vous que './api' pointe vers le bon fichier

export const createWorkoutSession = async (sessionData) => {
  try {
    const user = JSON.parse(sessionStorage.getItem('user')); // Utiliser la clé string correcte
    if (!user) throw new Error('Utilisateur non authentifié.');

    const formattedData = {
      dateSeance: new Date(sessionData.date).toISOString(),
      user: {
        id: user.id
      },
      nom: sessionData.name,
      blocs: sessionData.exercises.map(ex => ({
        exercice: { 
          idExercice: ex.idExercice // Assurez-vous que 'idExercice' est le bon champ
        },
        reps: ex.sets.reduce((acc, set) => acc + set.reps, 0), // Total des répétitions
        serie: ex.sets.length,
        poids: ex.sets.reduce((acc, set) => acc + set.weight, 0) / ex.sets.length, // Moyenne des poids
        tempsRepos: ex.tempsRepos, // Temps de repos dynamique
        tempsDeRepetition: ex.tempsDeRepetition // Temps de répétition dynamique
      }))
    };

    console.log('Données envoyées au serveur:', formattedData);
    
    const response = await apiRequest('/seances', 'POST', formattedData);

    return response;
  } catch (error) {
    console.error('Error creating workout session:', error);
    throw error;
  }
}; 
