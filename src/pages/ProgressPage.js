// src/pages/ProgressPage.js
import React, { useState, useEffect } from 'react';
import { getProgress } from '../services/ProgressService';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Navbar from './shared/Navbar';


// Enregistrer les composants nécessaires de Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const ProgressPage = () => {
  const [period, setPeriod] = useState('weekly');
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProgress = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getProgress(period);
      setProgress(data);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Chargement des données...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center">
        Erreur lors de la récupération des données.
      </div>
    );
  }

  // Préparer les données pour les graphiques
  const repetitionsData = {
    labels: Object.keys(progress.repetitionsPerPeriod),
    datasets: [
      {
        label: 'Répétitions',
        data: Object.values(progress.repetitionsPerPeriod),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  const caloriesData = {
    labels: Object.keys(progress.caloriesBurnedPerPeriod),
    datasets: [
      {
        label: 'Calories Brûlées',
        data: Object.values(progress.caloriesBurnedPerPeriod),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const distanceData = {
    labels: Object.keys(progress.distancePerPeriod),
    datasets: [
      {
        label: 'Distance Parcourue (km)',
        data: Object.values(progress.distancePerPeriod),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <Navbar />
      <h1 className="text-2xl font-bold mb-6">Mon Avancement</h1>

      {/* Sélecteur de période */}
      <div className="mb-6">
        <label className="mr-4">Période :</label>
        <select
          value={period}
          onChange={handlePeriodChange}
          className="p-2 rounded bg-zinc-800 text-white"
        >
          <option value="weekly">Hebdomadaire</option>
          <option value="monthly">Mensuel</option>
          <option value="yearly">Annuel</option>
        </select>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Répétitions */}
        <div className="bg-zinc-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Répétitions</h2>
          <Bar data={repetitionsData} />
        </div>

        {/* Calories Brûlées */}
        <div className="bg-zinc-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Calories Brûlées</h2>
          <Line data={caloriesData} />
        </div>

        {/* Distance Parcourue */}
        <div className="bg-zinc-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Distance Parcourue (km)</h2>
          <Pie data={distanceData} />
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
