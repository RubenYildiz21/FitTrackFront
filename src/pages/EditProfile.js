import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRulerVertical } from 'react-icons/fa';
import { IoScaleOutline } from 'react-icons/io5';
import { FaBirthdayCake } from 'react-icons/fa';
import Navbar from "./shared/Navbar";
import apiRequest from '../services/api';

const EditProfile = () => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState('');
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
        // Inclure d'autres champs si nécessaire
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

  const getProfilePicturePath = (base64String) => {
    try {
      return `data:image/jpeg;base64,${base64String}`;
    } catch (e) {
      console.error("Échec du décodage de l'image de profil", e);
      return require('../assets/images/profile.png'); // Chemin par défaut
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="bg-black text-white min-h-screen p-6 mb-10">
      <Navbar />
      <button
        className="text-gray-400 hover:text-white mb-4 text-2xl p-2"
        onClick={() => navigate(-1)}
      >
        &#8592; {/* Flèche gauche */}
      </button>
      <form onSubmit={handleUpdateProfile}>
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <img
              src={profilePicture ? getProfilePicturePath(profilePicture) : require('../assets/images/profile.png')}
              alt="Photo de profil"
              className="object-cover w-full h-full"
            />
          </div>
          <label className="text-center mb-2">
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  const base64 = await convertToBase64(file);
                  setProfilePicture(base64.split(',')[1]);
                }
              }}
              className="hidden"
            />
            <span className="bg-orange-500 hover:bg-orange-400 py-2 px-4 rounded cursor-pointer">
              Changer la photo de profil
            </span>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Prénom</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 text-white bg-gray-800 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Nom</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 text-white bg-gray-800 rounded-md"
            required
          />
        </div>
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-white mb-2">Taille (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-2 text-white bg-gray-800 rounded-md"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-white mb-2">Poids (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2 text-white bg-gray-800 rounded-md"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Âge</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-2 text-white bg-gray-800 rounded-md"
            required
          />
        </div>
        {/* Ajouter d'autres champs si nécessaire */}
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-400 py-2 px-4 rounded w-full"
        >
          Sauvegarder les modifications
        </button>
      </form>
    </div>
  );
};

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export default EditProfile;
