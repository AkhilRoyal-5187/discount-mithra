require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const adminData = {
      username: 'admin',
      password: 'Admin@123', // This will be hashed by the model's pre-save hook
      email: 'admin@discountmithra.com',
      role: 'super_admin',
      isActive: true
    };

    const admin = new Admin(adminData);
    await admin.save();

    console.log('Admin user created successfully');
    console.log('Username:', adminData.username);
    console.log('Password:', adminData.password);
    console.log('Please change these credentials after first login');

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

createAdmin(); 