import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/style.css';
import { updateProfile } from '../services/userService';
import Navbar from "./shared/Navbar";

const EditProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
          setFirstName(user.firstName || '');
          setLastName(user.lastName || '');
          setHeight(user.height || '');
          setWeight(user.weight || '');
          setProfilePicture(user.profilePicture || '');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to load user profile');
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const userId = user.id;

      const updatedProfile = {
        firstName,
        lastName,
        height,
        weight,
        mainGoal: user.mainGoal,
        goalWeight: user.goalWeight,
        place: user.place,
        trainingLevel: user.trainingLevel
      };

      await updateProfile(updatedProfile);

      const updatedUser = {
        ...user,
        ...updatedProfile
      };
      sessionStorage.setItem('user', JSON.stringify(updatedUser));

      navigate(-1);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    }
  };

  const getProfilePicturePath = (base64String) => {
    try {
      return `data:image/jpeg;base64,${base64String}`;
    } catch (e) {
      console.error("Failed to decode Base64 profile picture string", e);
      return require('../assets/images/profile.png'); // Image par défaut
    }
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <Navbar/>
      {/* Container */}
      <div className="w-full max-w-lg p-10 bg-black bg-opacity-90 rounded-lg animate-slideUp">
        {/* Header with back button */}
        <div className="flex items-center mb-10 animate-fadeInFast">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:text-orange-500 transition duration-200 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h2 className="flex-grow text-center text-3xl font-bold animate-fadeInFast">
            Edit Personal Informations
          </h2>
        </div>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={profilePicture ? getProfilePicturePath(profilePicture) : require('../assets/images/profile.png')}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-orange-500"
            />
            <label htmlFor="profile-picture" className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors">
              <input
                type="file"
                id="profile-picture"
                className="hidden"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    try {
                      const base64 = await convertToBase64(file);
                      setProfilePicture(base64.split(',')[1]); // Enlever le préfixe data:image/...
                      
                      // Mettre à jour le user dans le sessionStorage avec la nouvelle image
                      const user = JSON.parse(sessionStorage.getItem('user'));
                      const updatedUser = {
                        ...user,
                        profilePicture: base64.split(',')[1]
                      };
                      sessionStorage.setItem('user', JSON.stringify(updatedUser));
                    } catch (error) {
                      console.error('Error updating profile picture:', error);
                      setError('Failed to update profile picture');
                    }
                  }
                }}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </label>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-fadeIn">
            <label className="block text-lg mb-2">Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              placeholder="Name"
              required
            />
          </div>

          <div className="animate-fadeIn">
            <label className="block text-lg mb-2">Surname</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              placeholder="Surname"
              required
            />
          </div>

          <div className="animate-fadeIn">
            <label className="block text-lg mb-2">Tall</label>
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              placeholder="Tall"
              required
            />
          </div>

          <div className="animate-fadeIn">
            <label className="block text-lg mb-2">Weight</label>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              placeholder="Weight"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-6 bg-orange-500 text-white text-lg font-semibold rounded-md hover:bg-orange-600 transition focus:outline-none focus:ring-2 focus:ring-orange-500 transform hover:scale-105 ease-out animate-fadeIn"
          >
            Sauvegarder
          </button>
        </form>
      </div>
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