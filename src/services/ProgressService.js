// src/services/ProgressService.js

import apiRequest from "./api";


// Fonction pour obtenir les progrès
export const getProgress = async (period = 'weekly') => {
  try {
    const data =  await apiRequest(`/progress?period=${period}`, 'GET');
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des progrès:', error);
    throw error;
  }
};
