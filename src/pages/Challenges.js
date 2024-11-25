import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChallenges } from '../services/challengeService';
import Navbar from "./shared/Navbar";

const Challenges = () => {
    const navigate = useNavigate();

    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch challenges from the backend
    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const data = await getChallenges();
                setChallenges(data);
            } catch (err) {
                console.error('Error fetching challenges:', err);
                setError('Failed to load challenges. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-black text-white animate-fadeIn">
            {/* Main content */}
            <div className="flex-1 overflow-visible p-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto p-6 bg-black bg-opacity-90 rounded-lg">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold">Mes défis</h2>
                        <button
                            className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
                            onClick={() => navigate('/CreateChallenge')}
                        >
                            Créer un défi
                        </button>
                    </div>

                    {/* Loading or Error State */}
                    {loading && <p className="text-center">Loading challenges...</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}

                    {/* Challenges List */}
                    {!loading && !error && challenges.length === 0 && (
                        <p className="text-center">No challenges found. Create one!</p>
                    )}
                    <div className="space-y-6 overflow-y-auto max-h-[70vh] p-2">
                        {challenges.map((challenge, index) => (
                            <div key={challenge.id || index} className="p-4 bg-gray-800 rounded-lg">
                                <h3 className="text-xl font-bold">{challenge.title}</h3>
                                <p className="text-sm mt-1">Le défi se termine : {challenge.endingDate}</p>
                                <p className="text-sm">Votre classement : {challenge.ranking}</p>
                                <button
                                    className="mt-4 w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700"
                                    onClick={() => navigate(`/defi/${challenge.id}`)}
                                >
                                    Consulter
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <Navbar />
        </div>
    );
};

export default Challenges;
