// src/components/ServicesPage.jsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import doctor from '../assests/doctor2.jpg';
import education from '../assests/school.jpg';
import grocery from '../assests/Grocery.webp';
import food from '../assests/food.jpg';
import carAndBike from '../assests/carAndBike.webp';
import banking from '../assests/bank.jpg';
import travels from '../assests/travels.jpg';
import shopping from '../assests/shopping.jpg';
import Constructions from '../assests/constructions.png';
import Bar from '../assests/bar.webp';
import wine from '../assests/wine.webp';
import saloon from '../assests/saloon.webp';
import tailor from '../assests/tailor.webp';
import laundry from '../assests/laundry.webp';
import events from '../assests/events.webp';
import gift from '../assests/gift.webp';

const services = [
  {
    img: doctor,
    title: 'Healthcare ',
    description: 'Save big on prescriptions, doctor visits, and wellness services for your well-being.',
    color: 'bg-purple-500',
  },
  {
    img: education,
    title: 'Education',
    description: 'Unlock discounts on school fees, supplies, and educational programs.',
    color: 'bg-blue-400',
  },
  {
    img: grocery,
    title: 'Fresh',
    description: 'Enjoy exclusive discounts on your everyday grocery shopping and fresh produce.',
    color: 'bg-violet-500',
  },
  {
    img: food,
    title: 'Food',
    description: 'From street food to fine dining, explore diverse culinary experiences with special discounts.',
    color: 'bg-rose-400',
  },
  {
    img: carAndBike,
    title: 'Car & Bike Care',
    description: 'Get exclusive deals on vehicle maintenance, repairs, and transportation services.',
    color: 'bg-indigo-500',
  },
  {
    img: banking,
    title: 'Banking',
    description: 'Access special offers on loans, credit cards, and other essential financial services.',
    color: 'bg-blue-500',
  },
  {
    img: travels,
    title: 'Travels',
    description: 'Connect with travel dealers and get discounts on hotels, flights, and tour packages.',
    color: 'bg-purple-400',
  },
  {
    img: shopping,
    title: 'Shopping',
    description: 'Explore trending styles and save big with exclusive discounts from your favorite stores.',
    color: 'bg-violet-600',
  },
  {
    img: Constructions,
    title: 'Construction',
    description: 'Find special rates on construction materials, home renovations, and building services.',
    color: 'bg-rose-500',
  },
  {
    img: Bar,
    title: 'Bar',
    description: 'Unwind and enjoy great savings on drinks and ambiance at popular bars and lounges.',
    color: 'bg-rose-500',
  },
  {
    img: wine,
    title: 'Wine Shop',
    description: 'Discover discounts on a wide selection of wines and spirits from local shops.',
    color: 'bg-rose-500',
  },
  {
    img: saloon,
    title: 'Salon',
    description: 'Treat yourself to hair, beauty, and grooming services with exclusive salon deals.',
    color: 'bg-rose-500',
  },
  {
    img: tailor,
    title: 'Tailor',
    description: 'Get custom fits and alterations for your clothing at discounted rates from skilled tailors.',
    color: 'bg-rose-500',
  },
  {
    img: laundry,
    title: 'Laundry',
    description: 'Save money with convenient discounts on professional laundry and dry-cleaning ',
    color: 'bg-rose-500',
  },
  {
    img: events,
    title: 'Events',
    description: 'Find exclusive deals on tickets and services for unforgettable events and celebrations.',
    color: 'bg-rose-500',
  },
  {
    img: gift,
    title: 'Gift Articles',
    description: 'Discover unique gift ideas and special discounts on articles for every occasion.',
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
                    if (service.title === 'Healthcare ') { 
                      navigate('/hospitals');
                    } else if (service.title === 'Education') {
                      navigate('/education');
                    } else if (service.title === 'Fresh') { 
                      navigate('/fresh');
                    } else if (service.title === 'Food') {
                      navigate('/food');
                    } else if (service.title === 'Car & Bike Care') {
                      navigate('/car-bike-care');
                    } else if (service.title === 'Banking') {
                      navigate('/banking');
                    } else if (service.title === 'Travels') {
                      navigate('/travels');
                    } else if (service.title === 'Shopping') {
                      navigate('/shopping');
                    } else if (service.title === 'Construction') {
                      navigate('/construction'); // Placeholder route
                    } else if (service.title === 'Bar') {
                      navigate('/bars'); // Placeholder route
                    } else if (service.title === 'Wine Shop') {
                      navigate('/wine-shops'); // Placeholder route
                    } else if (service.title === 'Salon') {
                      navigate('/salons'); // Placeholder route
                    } else if (service.title === 'Tailor') {
                      navigate('/tailors'); // Placeholder route
                    } else if (service.title === 'Laundry') {
                      navigate('/laundry'); // Placeholder route
                    } else if (service.title === 'Events') {
                      navigate('/events'); // Placeholder route
                    } else if (service.title === 'Gift Articles') {
                      navigate('/gift-articles'); // Placeholder route
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