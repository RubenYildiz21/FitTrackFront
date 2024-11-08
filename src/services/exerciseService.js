import apiRequest from './api';

export const fetchExercises = async () => {
  try {
    const data = await apiRequest('/exercices', 'GET');
    return data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
}; 