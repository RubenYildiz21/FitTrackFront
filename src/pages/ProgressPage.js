// src/pages/ProgressPage.js
import React, { useState, useEffect } from 'react';
import { getProgress } from '../services/ProgressService';
import Navbar from './shared/Navbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion';
import { FaFireAlt, FaDumbbell, FaRunning, FaTrophy } from 'react-icons/fa';

const ProgressPage = () => {
  const [period, setPeriod] = useState('weekly');
  const [progress, setProgress] = useState({
    repetitionsPerPeriod: {},
    setsPerPeriod: {},
    weightLiftedPerPeriod: {},
    caloriesBurnedPerPeriod: {},
    distancePerPeriod: {},
    personalRecords: {},
    workoutsPerDay: {},
    totalWeightLiftedAllTime: 0,
    maxWeightLiftedAllTime: 0,
    exerciseWithMaxWeightAllTime: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProgress = async () => {
    setLoading(true);
    setError(false);
    try {
      // Récupérer les données filtrées par période
      const periodData = await getProgress(period);
      // Récupérer les données "all-time"
      const allTimeData = await getProgress('all');

      // Combiner les données
      setProgress({
        ...periodData,
        totalWeightLiftedAllTime: allTimeData.totalWeightLifted,
        maxWeightLiftedAllTime: allTimeData.maxWeightLifted,
        exerciseWithMaxWeightAllTime: allTimeData.exerciseWithMaxWeight,
      });
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

  const calculateConsistencyStreak = () => {
    const workoutDates = Object.keys(progress.workoutsPerDay).map((date) => new Date(date));
    workoutDates.sort((a, b) => a - b);

    let longestStreak = 0;
    let currentStreak = 0;
    let lastDate = null;

    for (let date of workoutDates) {
      if (lastDate) {
        const diff = (date - lastDate) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
          currentStreak += 1;
        } else {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
      lastDate = date;
    }
    return longestStreak;
  };

  const getTotalWeightLifted = () => {
    return Object.values(progress.weightLiftedPerPeriod).reduce((a, b) => a + b, 0);
  };

  // Nouvelle fonction pour obtenir le poids maximal et l'exercice
  const getMaxWeightLifted = () => {
    const maxWeight = progress.maxWeightLifted;
    const exercise = progress.exerciseWithMaxWeight;
    return { maxWeight, exercise };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        Chargement des données...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-red-500 flex items-center justify-center">
        Erreur lors de la récupération des données.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen p-4 mb-24">
      <Navbar />

      {/* Calendrier des Séances */}
      <div className="bg-gray-800 p-4 rounded-lg mt-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Calendrier des Séances prestées</h2>
        <Calendar
          tileClassName={({ date, view }) => {
            if (progress.workoutsPerDay[date.toISOString().split('T')[0]]) {
              return 'workout-day';
            }
          }}
        />
        <style jsx>{`
          .workout-day {
            background-color: #f97316 !important;
            color: white !important;
          }
          .react-calendar {
            background-color: #1f2937;
            color: #d1d5db;
            border: none;
            border-radius: 8px;
          }
          .react-calendar__navigation button {
            color: #d1d5db;
          }
          .react-calendar__month-view__weekdays {
            text-transform: uppercase;
            font-weight: bold;
            color: #9ca3af;
          }
          .react-calendar__tile {
            background: none;
          }
          .react-calendar__tile--active {
            background-color: #4b5563 !important;
            color: white !important;
          }
          .react-calendar__tile--now {
            background-color: #374151 !important;
            color: white !important;
          }
        `}</style>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center">Mon Avancement</h1>

      {/* Sélecteur de période */}
      <div className="mb-6 text-center">
        <label className="mr-4">Période :</label>
        <select
          value={period}
          onChange={handlePeriodChange}
          className="p-2 rounded bg-gray-700 text-white"
        >
          <option value="weekly">Hebdomadaire</option>
          <option value="monthly">Mensuel</option>
          <option value="yearly">Annuel</option>
        </select>
      </div>

      {/* Indicateurs clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Meilleure Série */}
        <motion.div
          className="bg-gray-800 p-4 rounded-lg text-center flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaTrophy className="text-4xl text-orange-500 mb-2" />
          <h2 className="text-xl font-semibold mb-2">Meilleure Série</h2>
          <p className="text-4xl font-bold text-orange-500">
            {calculateConsistencyStreak()} jours
          </p>
        </motion.div>

        {/* Calories Brûlées */}
        <motion.div
          className="bg-gray-800 p-4 rounded-lg text-center flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaFireAlt className="text-4xl text-orange-500 mb-2" />
          <h2 className="text-xl font-semibold mb-2">Calories Brûlées</h2>
          <p className="text-4xl font-bold text-orange-500">
            {Object.values(progress.caloriesBurnedPerPeriod)
              .reduce((a, b) => a + b, 0)
              .toFixed(2)}
          </p>
        </motion.div>

        {/* Poids Total Soulevé */}
        {/* Poids Max Soulevé */}
        <motion.div
          className="bg-gray-800 p-4 rounded-lg text-center flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDumbbell className="text-4xl text-orange-500 mb-2" />
          <h2 className="text-xl font-semibold mb-2">Poids Soulevé depuis la première séance</h2>
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold text-orange-500">
              Total: {progress.totalWeightLiftedAllTime} kg
            </p>
            {progress.maxWeightLifted > 0 ? (
              <div className="flex flex-col items-center mt-4">
                <h2 className="text-xl font-semibold mb-2">Poids maximum Soulevé</h2>
                <p className="text-2xl font-bold text-orange-500">
                  Max: {progress.maxWeightLiftedAllTime} kg
                </p>
                <p className="text-gray-400">{progress.exerciseWithMaxWeightAllTime}</p>
              </div>
            ) : (
              <p className="text-gray-400 mt-4">Aucune donnée de poids soulevé.</p>
            )}
          </div>
        </motion.div>


        {/* Distance Parcourue */}
        <motion.div
          className="bg-gray-800 p-4 rounded-lg text-center flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaRunning className="text-4xl text-orange-500 mb-2" />
          <h2 className="text-xl font-semibold mb-2">Distance Parcourue</h2>
          <p className="text-4xl font-bold text-orange-500">
            {Object.values(progress.distancePerPeriod)
              .reduce((a, b) => a + b, 0)
              .toFixed(2)}{' '}
            km
          </p>
        </motion.div>
      </div>

      {/* Records Personnels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div
          className="bg-gray-800 p-4 rounded-lg text-center flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h2 className="text-xl font-semibold mb-4">Records Personnels</h2>
          {Object.keys(progress.personalRecords).length > 0 ? (
            <div className="flex flex-wrap justify-around w-full">
              {Object.keys(progress.personalRecords).map((key, index) => (
                <div key={index} className="flex flex-col items-center m-2">
                  <p className="text-2xl font-bold text-orange-500">
                    {progress.personalRecords[key]} kg
                  </p>
                  <p className="text-gray-400 text-sm">{key}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Aucun record personnel enregistré.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressPage;
