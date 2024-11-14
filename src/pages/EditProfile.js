import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/style.css';
import { updateProfile } from '../services/userService';
import Navbar from "./shared/Navbar";

const EditProfile = () => {
  const [firstName, setFirstName] = useState('jotaro');
  const [lastName, setLastName] = useState('kujo');
  const [height, setHeight] = useState('180cm');
  const [weight, setWeight] = useState('83 kg');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProfile = { firstName, lastName, height, weight };
    try {
      await updateProfile(updatedProfile);
      console.log('Profile updated successfully:', updatedProfile);
      navigate(-1);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

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
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-orange-500"
            />
            <button className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full">
              Change Picture
            </button>
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

export default EditProfile;