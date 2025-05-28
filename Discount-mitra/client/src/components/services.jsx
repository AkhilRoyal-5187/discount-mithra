// src/components/ServicesPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import doctor from '../assests/doctor2.jpg'
import education from '../assests/school.jpg'
import grocery from '../assests/Grocery.webp'
import food from '../assests/food.jpg';
import transport from '../assests/images.jpg';
import banking from '../assests/bank.jpg';
import travels from '../assests/travels.jpg';
import shopping from '../assests/shopping.jpg';
import fitness from '../assests/fitness.webp';


const services = [
  {
    img: doctor,
    title: 'Healthcare Discounts',
    description: 'Save big on prescriptions, doctor visits, and wellness services.',
    color: 'bg-purple-500',
  },
  {
    img: education,
    title: 'Education',
    description: 'Get assistance and discounts on school fees and supplies.',
    color: 'bg-blue-400',
  },
  {
    img: grocery,
    title: 'Grocery & Retail Offers',
    description: 'Enjoy exclusive discounts on your everyday shopping.',
    color: 'bg-violet-500',
  },
  {
    img: food,
    title: 'Food',
    description: 'From street food to fine dining, explore it all with special discounts.',
    color: 'bg-rose-400',
  },
  {
    img: transport,
    title: 'Transport Savings',
    description: 'Discounts on public and private transportation services.',
    color: 'bg-indigo-500',
  },
  {
    img: banking,
    title: 'Banking',
    description: 'Get help with loans, credit cards, and more.',
    color: 'bg-blue-500',
  },
  {
    img:    travels,
    title: 'Travels',
    description: 'Connect with travel dealers and get 10% off.',
    color: 'bg-purple-400',
  },
  {
    img:    shopping,
    title: 'Shopping',
    description: 'Explore trending styles and save big with exclusive shopping discounts.',
    color: 'bg-violet-600',
  },
  {
    img: fitness,
    title: 'Fitness & Wellness',
    description: 'Save on gym memberships, yoga classes, and wellness apps.',
    color: 'bg-rose-500',
  },
];

const ServicesPage = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-gray-900 min-h-screen text-white px-4 sm:px-6 lg:px-20 py-16 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Discover the Best Deals on Discount Mithra
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Save on healthcare, groceries, school fees, and much more with exclusive smart deals curated for your needs.
        </motion.p>
      </section>

      {/* Services Grid */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-blue-400 mb-10 tracking-wider uppercase">
          Explore Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 180 }}
              className="flex rounded-2xl shadow-md text-left max-w-md h-40 overflow-hidden bg-gray-800/50 backdrop-blur-md border border-gray-700"
            >
              <div className="w-2/5 h-full flex-shrink-0">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-3/5 p-4 flex flex-col justify-between">
                <h3 className="text-lg font-bold text-white">{service.title}</h3>
                <p className="text-sm text-gray-300">{service.description}</p>
                <Button
                  className="text-blue-400 font-semibold mt-2 px-0 hover:underline text-sm"
                  onClick={() => {
                    if (service.title === 'Healthcare Discounts') {
                      navigate('/hospitals');
                    } else if (service.title === 'Food') {
                      navigate('/food');
                    } else {
                      alert('This service is not available yet.');
                    }
                  }}
                >
                  Explore now →
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;