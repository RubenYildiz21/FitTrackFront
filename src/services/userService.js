/**
 * Gère les appels liés aux utilisateurs (récupération de profil, modification des objectifs, etc.)
 */

import apiRequest from './api';

export const updateProfile = async (updatedProfile) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user.id;

  try {
    const response = await fetch(`http://localhost:8080/api/auth/edit/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...updatedProfile,
        profilePicture: updatedProfile.profilePicture
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Failed to update profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in updateProfile:', error);
    throw error;
  }
};


export const updateGoals = async (updatedGoals) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user.id;

  try {
    const response = await fetch(`http://localhost:8080/api/auth/editGoals/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mainGoal: updatedGoals.mainGoal,
        goalWeight: updatedGoals.goalWeight,
        place: updatedGoals.place,
        trainingLevel: updatedGoals.trainingLevel,
        height: user.height,
        weight: user.weight
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Failed to update goals');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in updateGoals:', error);
    throw error;
  }
};

