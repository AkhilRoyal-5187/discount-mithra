// src/components/ConstructionPage.jsx
import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
// You might want a specific construction image, but 'gift' is used as a placeholder
import construction from '../assests/constructions.png'; 

const constructionServices = [
    {
        id: 1,
        name: "BuildPro Materials",
        image: construction, // Placeholder image
        address: "Bypass Road",
        Phone: "7799663223",
        offers: [
            "10% on cement",
            "15% on steel",
            "Bulk order offer"
        ],
    },
    {
        id: 2,
        name: "HomeFix Contractors",
        image: construction, // Placeholder image
        address: "Gandhi Nagar",
        Phone: "7799663223",
        offers: [
            "Free estimate",
            "10% discount",
            "Warranty services"
        ],
    },
    {
        id: 3,
        name: "Tiles World",
        image: construction, // Placeholder image
        address: "Karimnagar Road",
        Phone: "7799663223",
        offers: [
            "15% tiles discount",
            "10% on fitting",
            "Combo packs"
        ],
    },
];

const ConstructionPage = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top-left corner of the window
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
                Construction Services in Sircilla
            </motion.h1>

            <div className="space-y-6">
                {constructionServices.map((service) => (
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
                                onError={(e) => { e.target.onerror = null; e.target.src = construction; }}
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

export default ConstructionPage;