import apiRequest from './api';

const API_URL = '/api/challenges';

// Create a new challenge
export const createChallenge = async (challengeData) => {
    try {
        const response = await apiRequest(`${API_URL}/create`, 'POST', challengeData);
        console.log('Challenge created successfully:', response);
        return response;
    } catch (error) {
        console.error('Error creating challenge:', error);
        throw error;
    }
};

// Get all challenges
export const getChallenges = async () => {
    try {
        const response = await apiRequest(API_URL, 'GET');
        console.log('Challenges fetched successfully:', response);
        return response;
    } catch (error) {
        console.error('Error fetching challenges:', error);
        throw error;
    }
};
