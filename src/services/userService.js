/**
 * Gère les appels liés aux utilisateurs (récupération de profil, modification des objectifs, etc.)
 */

import apiRequest from './api';

export const updateProfile = async (profileData) => {
    const response = await apiRequest('/auth/edit/user/{id}', 'POST', profileData);;
  
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
  
    return response.json();
};


export const updateGoals = async (goalsData) => {
    const response = await apiRequest('/auth/editGoals/user/{id}', 'POST', goalsData);;
  
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
  
    return response.json();
};

