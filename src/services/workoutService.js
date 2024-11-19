import apiRequest from './api';

export const createWorkoutSession = async (sessionData) => {
  try {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) throw new Error('Utilisateur non authentifié.');

    const formattedData = {
      dateSeance: new Date(sessionData.date).toISOString(),
      nom: sessionData.name,
      userId: user.id,
      blocs: sessionData.exercises.map(ex => ({
        exercice: { 
          idExercice: ex.id 
        },
        repetition: ex.sets[0]?.reps || 0,
        serie: ex.sets.length,
        poids: ex.sets[0]?.weight || 0,
        tempsRepos: "00:00:30",
        tempsDeRepetition: "00:00:05"
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