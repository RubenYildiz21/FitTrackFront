import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { getLeaderBoard, getChallengeDetails, quitChallenge } from "../services/challengeService";
import { useParams, useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../services/authService"; // Import useNavigate

const Classement = () => {
    const { challengeId } = useParams();
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [challengeDetails, setChallengeDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const data = await getLeaderBoard(challengeId);
                setLeaderboardData(data);
            } catch (err) {
                console.error('Error fetching leaderboard data:', err);
                setError('Failed to load leaderboard data. Please try again later.');
            }
        };

        const fetchChallengeDetails = async () => {
            try {
                const details = await getChallengeDetails(challengeId);
                setChallengeDetails(details);
            } catch (err) {
                console.error('Error fetching challenge details:', err);
                setError('Failed to load challenge details. Please try again later.');
            }
        };

        // Fetch both leaderboard and challenge details
        fetchLeaderboardData();
        fetchChallengeDetails();
    }, [challengeId]);

    const handleQuit = async () => {
        try {
            const response = await quitChallenge(getLoggedInUser().id, challengeId);
            console.log('Successfully quit challenge:', response);
            navigate('/Challenges');
        } catch (err) {
            console.error('Error quitting challenge:', err);
            setError('Failed to quit challenge. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-black text-white relative">
            {/* Quitter Button */}
            <button
                onClick={handleQuit}
                className="absolute right-6 top-6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none"
            >
                Quitter
            </button>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto p-6 bg-black bg-opacity-90 rounded-lg">
                    {/* Header */}
                    <h2 className="text-2xl font-semibold text-center mb-6">Classement</h2>

                    {/* Display Challenge Details */}
                    {challengeDetails ? (
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-orange-500 mb-2">{challengeDetails.title}</h3>
                            <p className="text-sm text-gray-400 mb-2">
                                <strong>Début:</strong> {new Date(challengeDetails.beginingDate).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-400 mb-4">
                                <strong>Fin:</strong> {new Date(challengeDetails.endingDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-300"><strong>Exercice:</strong> {challengeDetails.exercise}</p>
                            <p className="text-gray-300"><strong>Description:</strong> {challengeDetails.description}</p>

                        </div>
                    ) : (
                        <p className="text-center text-gray-400">Loading challenge details...</p>
                    )}

                    {/* Loading or Error State */}
                    {error && <p className="text-center text-red-500">{error}</p>}

                    {/* Leaderboard Table */}
                    <div className="space-y-4">
                        {leaderboardData.map((entry, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-between p-4 rounded-lg ${
                                    index === 0
                                        ? "bg-orange-600 text-white"
                                        : "bg-gray-800 text-gray-200"
                                }`}
                            >
                                <span className="text-lg font-bold">{index + 1}</span>
                                <span className="flex-1 text-center font-medium">{entry.name}</span>
                                <span className="text-lg font-bold">{entry.score}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <NavbarWrapper />
        </div>
    );
};

const NavbarWrapper = () => (
    <div className="fixed bottom-0 left-0 w-full bg-black">
        <Navbar />
    </div>
);

export default Classement;
