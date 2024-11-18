/**
 * Gère les appels liés aux utilisateurs (récupération de profil, modification des objectifs, etc.)
 */

import apiRequest from './api';

export const updateProfile = async (updatedProfile) => {
  try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const userId = user.id;

      const response = await apiRequest(`/auth/edit/user/${userId}`, 'PUT', {
          ...updatedProfile,
          profilePicture: updatedProfile.profilePicture
      });

      return response;
  } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      throw error;
  }
};


export const updateGoals = async (updatedGoals) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (!user) throw new Error('User not logged in');
  const userId = user.id;
  return await apiRequest(`/auth/update/${userId}`, 'PUT', updatedGoals);
};

