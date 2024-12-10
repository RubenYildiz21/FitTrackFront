// src/services/workoutService.js
import apiRequest from './api'; // Assurez-vous que './api' pointe vers le bon fichier

export const createWorkoutSession = async (sessionData) => {
  try {

    const response = await apiRequest('/seances', 'POST', sessionData);

    return response;
  } catch (error) {
    console.error('Error creating workout session:', error);
    throw error;
  }
}; 
