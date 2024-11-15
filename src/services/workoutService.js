import apiRequest from './api';

export const createWorkoutSession = async (sessionData) => {
  try {
    const user = JSON.parse(sessionStorage.getItem('user'));
    
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
    
    const response = await fetch('http://localhost:8080/api/seances', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating workout session:', error);
    throw error;
  }
}; 