import React, { useEffect, useState } from 'react';
import Navbar from "./shared/Navbar";
import apiRequest from '../services/api';


const GoalsPage = () => {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const fetchUserGoals = async () => {
            try {
                const userString = sessionStorage.getItem('user');
                if (userString) {
                    const user = JSON.parse(userString);
                    const data = await apiRequest(`/auth/goals/${user.id}`, 'GET');
                    setGoals(data);
                } else {
                    console.error("Aucun utilisateur trouvé dans sessionStorage");
                    setError("User not logged in.");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des objectifs utilisateur", error);
                setError("Could not fetch user goals.");
            }
        };

        fetchUserGoals();
    }, []);

    return (
        <div>
            <Navbar/>
            <h1>Goals</h1>
            <ul>
                {goals.map(goal => (
                    <li key={goal.id}>{goal.title} - {goal.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default GoalsPage;