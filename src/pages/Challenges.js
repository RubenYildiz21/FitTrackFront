import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChallengesByUser, joinChallenge } from '../services/challengeService';
import Navbar from './shared/Navbar';
import { getLoggedInUser } from "../services/authService";

const Challenges = () => {
    const navigate = useNavigate();
    const userId = getLoggedInUser().id;

    const [participatingChallenges, setParticipatingChallenges] = useState([]);
    const [joinableChallenges, setJoinableChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleJoinChallenge = async (challengeId) => {
        try {
            console.log('Attempting to join challenge with ID:', challengeId);
            const response = await joinChallenge(userId, challengeId);

            const updatedChallenges = await getChallengesByUser(userId);
            setParticipatingChallenges(updatedChallenges.participating);
            setJoinableChallenges(updatedChallenges.joinable);
        } catch (err) {
            console.error('Failed to join challenge:', err);
            alert('An error occurred while joining the challenge.');
        }
    };

    // Fetch challenges from the backend
    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const data = await getChallengesByUser(userId);
                setParticipatingChallenges(data.participating);
                setJoinableChallenges(data.joinable);
            } catch (err) {
                console.error('Error fetching challenges:', err);
                setError('Failed to load challenges. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, [userId]);

//             const updatedChallenges = await getChallengesByUser(userId);
//             setParticipatingChallenges(updatedChallenges.participating);
//             setJoinableChallenges(updatedChallenges.joinable);
//         } catch (err) {
//             console.error('Failed to join challenge:', err);
//             alert('An error occurred while joining the challenge.');
//         }
//     };

//     // Fetch challenges from the backend
//     useEffect(() => {
//         const fetchChallenges = async () => {
//             try {
//                 const data = await getChallengesByUser(userId);
//                 setParticipatingChallenges(data.participating);
//                 setJoinableChallenges(data.joinable);
//             } catch (err) {
//                 console.error('Error fetching challenges:', err);
//                 setError('Failed to load challenges. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

                    {/* Participating Challenges */}
                    <h3 className="text-xl font-bold mt-4">Vos défis : </h3>
                    {participatingChallenges.length === 0 ? (
                        <p className="text-center">Vous ne participez à aucun défi.</p>
                    ) : (
                        <div className="space-y-6 overflow-y-auto max-h-[35vh] p-2">
                            {participatingChallenges.map((challenge, index) => (
                                <div key={challenge.id || index} className="p-4 bg-gray-800 rounded-lg">
                                    <h3 className="text-xl font-bold">{challenge.title}</h3>
                                    <p className="text-sm mt-1">Le défi se termine : {challenge.endingDate}</p>
                                    <button
                                        className="mt-4 w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700"
                                        onClick={() => navigate(`/Classement/${challenge.id}`)}
                                    >
                                        Consulter
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Joinable Challenges */}
                    <h3 className="text-xl font-bold mt-8">Rejoignez un défi !</h3>
                    {joinableChallenges.length === 0 ? (
                        <p className="text-center">Aucun défi disponible pour rejoindre.</p>
                    ) : (
                        <div className="space-y-6 overflow-y-auto max-h-[35vh] p-2">
                            {joinableChallenges.map((challenge, index) => (
                                <div key={challenge.id || index} className="p-4 bg-gray-800 rounded-lg">
                                    <h3 className="text-xl font-bold">{challenge.title}</h3>
                                    <p className="text-sm mt-1">Le défi se termine : {challenge.endingDate}</p>
                                    <button
                                        className="mt-4 w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700"
                                        onClick={() => handleJoinChallenge(challenge.id)}
                                    >
                                        Rejoindre
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

//     return (
//         <div className="min-h-screen flex flex-col bg-black text-white animate-fadeIn">
//             {/* Main content */}
//             <div className="flex-1 overflow-visible p-4 sm:px-6 lg:px-8">
//                 <div className="max-w-md mx-auto p-6 bg-black bg-opacity-90 rounded-lg">
//                     {/* Header */}
//                     <div className="flex items-center justify-between mb-6">
//                         <h2 className="text-2xl font-semibold">Mes défis</h2>
//                         <button
//                             className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
//                             onClick={() => navigate('/CreateChallenge')}
//                         >
//                             Créer un défi
//                         </button>
//                     </div>

export default Challenges;