// src/components/FoodCards.jsx
import React from 'react';
import { motion } from 'framer-motion';

const restaurants = [
  {
    id: 1,
    name: "7 Arts Restaurant",
    image: "/assets/Restaurants.jpg",
    address: "Gandhi Nagar, Sircilla",
    distance: "2.5 km",
  },
  {
    id: 2,
    name: "Ice House",
    image: "/assets/Restaurants.jpg",
    address: "Sircilla",
    distance: "5.8 km",
  },
  {
    id: 3,
    name: "Shankar Pani Puri",
    image: "/assets/Restaurants.jpg",
    address: "Shivalayam, Sircilla",
    distance: "10.2 km",
  },
];

const FoodCards = () => {
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
        Food in Sircilla
      </motion.h1>
      <div className="space-y-6">
        {restaurants.map((restaurant) => (
          <motion.div
            key={restaurant.id}
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
                src={restaurant.image}
                alt={restaurant.name}
                className="w-24 h-24 object-cover rounded-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div>
                <h3 className="font-bold text-xl text-white">{restaurant.name}</h3>
                <p className="text-gray-300 text-sm">{restaurant.address}</p>
                <p className="text-gray-400 text-xs mt-1">{restaurant.distance} away</p>
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

export default FoodCards;