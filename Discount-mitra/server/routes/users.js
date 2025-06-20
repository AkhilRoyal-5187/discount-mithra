const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all users...');
    const users = await User.find().sort({ createdAt: -1 });
    console.log(`Found ${users.length} users`);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      message: 'Error fetching users',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const {
      idNo,
      cardHolderName,
      familyName,
      family2,
      family3,
      family4,
      family5,
      phoneNumber,
      validTill
    } = req.body;

    console.log('Creating new user:', req.body);

    // Check for duplicate idNo or phoneNumber
    const existingUser = await User.findOne({ $or: [{ idNo }, { phoneNumber }] });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'A user with this ID or phone number already exists',
        field: existingUser.idNo === idNo ? 'idNo' : 'phoneNumber'
      });
    }

    const user = new User({
      idNo,
      cardHolderName,
      familyName,
      family2: family2 || '',
      family3: family3 || '',
      family4: family4 || '',
      family5: family5 || '',
      phoneNumber,
      validTill: new Date(validTill)
    });
    await user.save();

    console.log('User created successfully:', user._id);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ 
      message: 'Error creating user',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update a user
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      cardHolderName,
      familyName,
      family2,
      family3,
      family4,
      family5,
      phoneNumber,
      validTill
    } = req.body;

    // Check for duplicate phoneNumber (excluding current user)
    const existingUser = await User.findOne({ phoneNumber, _id: { $ne: id } });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'A user with this phone number already exists',
        field: 'phoneNumber'
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        cardHolderName,
        familyName,
        family2: family2 || '',
        family3: family3 || '',
        family4: family4 || '',
        family5: family5 || '',
        phoneNumber,
        validTill: new Date(validTill)
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ 
      message: 'Error updating user',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Delete a user
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ 
      message: 'Error deleting user',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router; 