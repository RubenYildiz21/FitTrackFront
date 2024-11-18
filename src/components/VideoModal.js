
import React from 'react';
import Modal from 'react-modal';

const VideoModal = ({ isOpen, onRequestClose, videoUrl }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Vidéo de l'Exercice"
      className="bg-zinc-800 rounded-lg p-6 max-w-3xl mx-auto mt-20 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
    >
      <button onClick={onRequestClose} className="text-white text-xl mb-4">&times;</button>
      {videoUrl ? (
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={videoUrl}
            title="Vidéo de l'Exercice"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      ) : (
        <p className="text-white">Aucune vidéo disponible.</p>
      )}
    </Modal>
  );
};

export default VideoModal;
