import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      const storedAdminInfo = localStorage.getItem('adminInfo');

      if (!token || !storedAdminInfo) {
        navigate('/admin/login');
        return;
      }

      try {
        setAdminInfo(JSON.parse(storedAdminInfo));
        await fetchDashboardData();
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        navigate('/admin/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDashboardData(response.data.data);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      if (err.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-900 text-white flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-4xl"
        >
          🔄
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.header
        className="bg-gray-800 shadow-lg"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Welcome, {adminInfo?.username}</span>
            <motion.button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={itemVariants}
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500 text-white p-4 rounded-md mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-lg font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-indigo-400">
              {dashboardData?.totalUsers || 0}
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-lg font-semibold mb-2">Active Users</h3>
            <p className="text-3xl font-bold text-green-400">
              {dashboardData?.activeUsers || 0}
            </p>
          </motion.div>

          {/* Add more stat cards as needed */}
        </div>

        {/* Additional dashboard sections can be added here */}
      </motion.main>
    </motion.div>
  );
};

export default AdminDashboard; 