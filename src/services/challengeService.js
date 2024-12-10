/**
 * Service for managing challenges. Handles creating and fetching challenges via API calls.
 */

import apiRequest from './api';

const API_URL = '/challenges'; // Base endpoint for challenge-related API calls

/**
 * Create a new challenge.
 *
 * @param {Object} challengeData - The data for the challenge to create.
 * @returns {Object} The created challenge data from the server.
 * @throws Will throw an error if the API request fails.
 */
export const createChallenge = async (challengeData) => {
    try {
        const response = await apiRequest(`${API_URL}/create`, 'POST', challengeData);
        console.log('Challenge created successfully:', response);
        return response;
    } catch (error) {
        console.error('Error creating challenge:', error.message);
        throw new Error('Failed to create challenge');
    }
};

/**
 * Fetch all challenges.
 *
 * @returns {Array} An array of challenges retrieved from the server.
 * @throws Will throw an error if the API request fails.
 */
export const getChallengesByUser = async (userId) => {
    try {
        const response = await apiRequest(`${API_URL}/user/${userId}`, 'GET');
        return response;
    } catch (error) {
        console.error('Error fetching challenges by user:', error.message);
        throw new Error('Failed to fetch challenges by user');
    }
};


export const joinChallenge = async (userId, challengeId) => {
    try {
        const response = await apiRequest(`${API_URL}/join`, 'POST', {
            userId,
            challengeId,
        });
        console.log('Successfully joined challenge:', response);
        return response;
    } catch (error) {
        console.error('Error joining challenge:', error.message);
        throw new Error('Failed to join challenge');
    }
};


export const getLeaderBoard = async (challengeId) => {
    try {
        const response = await apiRequest(`${API_URL}/leaderBoard/${challengeId}`, 'GET');
        console.log('Leaderboard fetched successfully:', response);
        return response;
    } catch (error) {
        console.error('Error fetching leaderboard:', error.message);
        throw new Error('Failed to fetch leaderboard');
    }
};

export const quitChallenge = async (userId, challengeId) => {
    try {
        const response = await apiRequest(`${API_URL}/quit`, 'POST', {
            userId,
            challengeId,
        });        console.log('Challenge quitted successfully:', response);
        return response;
    } catch (error) {
        console.error('Error quitting  leaderboard:', error.message);
        throw new Error('Failed to fetch leaderboard');
    }
};

export const getChallengeDetails = async (challengeId) => {
    try {
        const response = await apiRequest(`${API_URL}/${challengeId}`, 'GET');
        console.log('Challenge details fetched successfully:', response);
        return response;
    } catch (error) {
        console.error('Error fetching challenge details:', error.message);
        throw new Error('Failed to fetch challenge details');
    }
};