import React, { useEffect, useState } from 'react';

const GoalsPage = () => {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/auth/register')
            .then(response => response.json()) // Convertir la réponse en JSON
            .then(data => {
                setGoals(data); // Mettre à jour l'état avec les objectifs
            })
            .catch(error => {
                console.error('There was an error fetching the goals!', error);
            });
    }, []);

    return (
        <div>
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