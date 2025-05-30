import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import wine from '../assests/wine.webp';

const wineShopServices = [
    {
        id: 1,
        name: "Wines (Coming Soon)",
        image: wine,
        address: "Coming Soon",
        Phone: "7799663223",
        offers: [
            "3% bottle discount."
        ],
    },
];

const WineShopPage = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Wine Shops in Sircilla
            </motion.h1>

            <div className="space-y-6">
                {wineShopServices.map((service) => (
                    <motion.div
                        key={service.id}
                        variants={cardVariants}
                        whileHover={{
                            scale: 1.03,
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                            transition: { duration: 0.3 },
                        }}
                        className="flex items-center justify-between bg-gray-800/50 backdrop-blur-md border border-gray-700 p-6 rounded-xl shadow-lg h-40 overflow-hidden"
                    >
                        <div className="flex items-center gap-5">
                            <motion.img
                                src={service.image}
                                alt={service.name}
                                className="w-24 h-24 object-cover rounded-md"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                onError={(e) => { e.target.onerror = null; e.target.src = wine; }}
                            />
                            <div>
                                <h3 className="font-bold text-xl text-white">{service.name}</h3>
                                <p className="text-gray-300 text-sm">Location: {service.address}</p>

                                {service.offers && (
                                    <ul className="text-gray-400 text-xs mt-1 list-disc list-inside">
                                        {service.offers.map((offer, i) => (
                                            <li key={i}>{offer}</li>
                                        ))}
                                        {service.Phone && <li key="phone">Phone: {service.Phone}</li>}
                                    </ul>
                                )}
                            </div>
                        </div>

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

export default WineShopPage;