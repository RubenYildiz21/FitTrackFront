import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./shared/Navbar";
import apiRequest from '../services/api';
import { ArrowLeftIcon, CameraIcon } from '@heroicons/react/24/outline';

const EditProfile = () => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState('');
  //const [selectedFile, setSelectedFile] = useState(null); // To store the selected file
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [mainGoal, setMainGoal] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userString = sessionStorage.getItem('user');
        if (userString) {
          const user = JSON.parse(userString);
          setUser(user);
          setUserId(user.id);
          setFirstName(user.firstName || '');
          setLastName(user.lastName || '');
          setHeight(user.height || '');
          setWeight(user.weight || '');
          setAge(user.age || '');
          setMainGoal(user.mainGoal || '');
          setGoalWeight(user.goalWeight || '');
          setProfilePicture(user.profilePicture || '');
        } else {
          console.error("Aucun utilisateur trouvé dans sessionStorage");
          setError("User not logged in.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil utilisateur", error);
        setError("Could not fetch user profile.");
      }
    };

    fetchUserProfile();
  }, []);

  const uploadedImage = async (file) => {
    if (!file) return '';

    const formData = new FormData();
    formData.append('file', file);


    try {
      const response = await apiRequest(`/users/${userId}/profile-picture`, 'POST', formData);
      return response.profilePicture;
    } catch (err) {
      console.error("Erreur lors de l'upload de l'image : ", err);
      setError("Could not upload image.");
      return '';
    }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);

      const uploadedImageUrl = await uploadedImage(file);
      if (uploadedImageUrl) {
        setProfilePicture(uploadedImageUrl);
      }
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = {
        firstName,
        lastName,
        height,
        weight,
        age,
        mainGoal,
        goalWeight,
        profilePicture,
      };
      console.log(updatedProfile);

      // Récupérer l'ID utilisateur depuis le stockage utilisateur
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (!user || !user.id) {
        throw new Error('Utilisateur non authentifié.');
      }

      // Appel à l'API pour mettre à jour le profil
      await apiRequest(`/users/${user.id}`, 'PUT', updatedProfile);
      console.log("API Request Success");

      // Mettre à jour l'utilisateur dans le sessionStorage
      const updatedUser = {
        ...user,
        ...updatedProfile,
      };

      console.log(updatedUser)
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      navigate('/Profil'); // Redirige vers la page de profil
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil", error);
      setError("Could not update profile.");
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div className="text-gray-500">Loading...</div>;



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />

      {/* Container principal */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-orange-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Retour</span>
          </button>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-8">
          {/* Photo de profil */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-gray-800">
                <img
                  src={profilePicture || require('../assets/images/profile.png')}
                  alt="Profile Picture"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <CameraIcon className="h-8 w-8 text-white" />
              </label>
            </div>
            <p className="mt-2 text-sm text-gray-400">Cliquez pour modifier</p>
          </div>

          {/* Informations personnelles */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Prénom
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Nom
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Taille (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Poids (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Âge
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Bouton de sauvegarde */}
          <button
            type="submit"
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          >
            Sauvegarder les modifications
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
