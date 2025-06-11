const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const twilio = require('twilio');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Add helper functions
function generateCredentials(name) {
  const cleanName = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 10); // Limit base name length
    
  // Generate a random 4-digit number
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const username = `${cleanName}_${randomNum}`;
  const password = Math.random().toString(36).substring(2, 8);
  return { username, password };
}

function validatePhoneNumber(phoneNumber) {
  try {
    // Remove any non-numeric characters except +
    let cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // Add + prefix if not present
    if (!cleaned.startsWith('+')) {
      cleaned = '+' + cleaned;
    }
    
    // Check for specific country codes and proper length
    // For Indian numbers: +91 followed by 10 digits
    if (cleaned.startsWith('+91') && cleaned.length === 13) {
      return cleaned;
    }
    
    // For US/Canada numbers: +1 followed by 10 digits
    if (cleaned.startsWith('+1') && cleaned.length === 12) {
      return cleaned;
    }
    
    // For other international numbers: must start with + and be between 10-15 digits
    if (/^\+\d{10,15}$/.test(cleaned)) {
      return cleaned;
    }
    
    throw new Error(
      'Invalid phone number format. Must be a valid international number:\n' +
      '- For India: +91 followed by 10 digits\n' +
      '- For US/Canada: +1 followed by 10 digits\n' +
      '- For other countries: + followed by country code and number'
    );
  } catch (error) {
    console.error('Phone validation error:', error.message);
    throw error;
  }
}

// Initialize Twilio client
let client;
try {
  client = twilio(
    process.env.TWILIO_ACCOUNT_SID, 
    process.env.TWILIO_AUTH_TOKEN
  );
} catch (error) {
  console.error('Twilio client initialization failed:', error);
}

// ...rest of your existing code...
// Add this login route after your signup route
router.post('/login', async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    // Find user by phoneNumber
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid phone number or password' 
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid phone number or password' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Login failed',
      error: error.message 
    });
  }
});
// Update the signup route with better error handling and logging
router.post('/signup', async (req, res) => {
  const { name, phoneNumber } = req.body;
  try {
    // Check for existing user
    let user = await User.findOne({ phoneNumber });
    if (user) {
      return res.status(400).json({ message: 'Phone number already exists' });
    }

    // Generate credentials
    const { username, password } = generateCredentials(name);
    
    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      // If username exists, try again with a different random number
      const { username: retryUsername, password: retryPassword } = generateCredentials(name);
      if (await User.findOne({ username: retryUsername })) {
        throw new Error('Unable to generate unique username. Please try again.');
      }
      // Use the retry credentials
      username = retryUsername;
      password = retryPassword;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object but don't save yet
    user = new User({ 
      name, 
      phoneNumber, 
      password: hashedPassword 
    });

    // Try to send SMS first
    if (!client) {
      throw new Error('Twilio client not initialized');
    }

    try {
      const formattedPhoneNumber = validatePhoneNumber(phoneNumber);
      console.log('Attempting to send SMS to:', formattedPhoneNumber);
      
      const message = await client.messages.create({
        body: `Welcome to Discount-mitra, ${name}!\nYour login credentials:\nPhone Number: ${phoneNumber}\nPassword: ${password}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: formattedPhoneNumber
      });
      
      console.log('SMS sent successfully. Message SID:', message.sid);
      
      // Only save user after successful SMS
      await user.save();
      
      res.status(201).json({ 
        success: true,
        message: 'Registration successful! Check your phone for login credentials.'
      });
      
    } catch (twilioError) {
      console.error('Twilio Error:', {
        code: twilioError.code,
        message: twilioError.message,
        moreInfo: twilioError.moreInfo
      });
      
      res.status(500).json({ 
        success: false,
        message: 'Failed to send SMS. Please contact support.',
        error: twilioError.message 
      });
    }
    
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Registration failed',
      error: error.message 
    });
  }
});
module.exports = router;