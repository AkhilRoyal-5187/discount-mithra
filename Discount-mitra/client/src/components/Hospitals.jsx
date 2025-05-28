// src/components/HospitalCards.jsx
import React from 'react';
import { motion } from 'framer-motion';

const hospitals = [
  {
    id: 1,
    name: "Lullu Children's Hospital",
    image:
      "https://images.unsplash.com/photo-1586771107445-3b3e016b781d?w=300&h=200&fit=crop",
    address: "Gandhi Nagar, Sircilla",
    distance: "2.5 km",
  },
  {
    id: 2,
    name: "Aditya Neuro & Ortho",
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=300&h=200&fit=crop",
    address: "Sircilla",
    distance: "5.8 km",
  },
  {
    id: 3,
    name: "Amrutha Hospital",
    image:
      "https://images.unsplash.com/photo-1587351022241-1c3547b6a5a0?w=300&h=200&fit=crop",
    address: "Sircilla",
    distance: "10.2 km",
  },
  {
    id: 4,
    name: "Chandana Chest Hospital",
    image:
      "https://images.unsplash.com/photo-1587351022241-1c3547b6a5a0?w=300&h=200&fit=crop",
    address: "Sircilla",
    distance: "11.2 km",
  },
];

const HospitalCards = () => {
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="bg-gray-900 min-h-screen text-white p-6 space-y-8 max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Hospitals in Sircilla
      </motion.h1>
      <div className="space-y-6">
        {hospitals.map((hospital) => (
          <motion.div
            key={hospital.id}
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
              transition: { duration: 0.3 },
            }}
            className="flex items-center justify-between bg-gray-800/50 backdrop-blur-md border border-gray-700 p-6 rounded-xl shadow-lg h-40 overflow-hidden"
          >
            {/* Left Section */}
            <div className="flex items-center gap-5">
              <motion.img
                src={hospital.image}
                alt={hospital.name}
                className="w-24 h-24 object-cover rounded-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div>
                <h3 className="font-bold text-xl text-white">{hospital.name}</h3>
                <p className="text-gray-300 text-sm">{hospital.address}</p>
                <p className="text-gray-400 text-xs mt-1">{hospital.distance} away</p>
              </div>
            </div>

            {/* Book Now Button */}
            <motion.button
              className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm px-6 py-2 rounded-full hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HospitalCards;