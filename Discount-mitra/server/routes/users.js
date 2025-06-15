const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const prisma = require('../prisma/client');

// Get all users
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching all users...');
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
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
router.post('/', authenticateToken, async (req, res) => {
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

    const user = await prisma.user.create({
      data: {
        idNo,
        cardHolderName,
        familyName,
        family2: family2 || '',
        family3: family3 || '',
        family4: family4 || '',
        family5: family5 || '',
        phoneNumber,
        validTill: new Date(validTill)
      }
    });

    console.log('User created successfully:', user.id);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === 'P2002') {
      res.status(400).json({ 
        message: 'A user with this ID or phone number already exists',
        field: error.meta?.target?.[0] || 'unknown'
      });
    } else {
      res.status(500).json({ 
        message: 'Error creating user',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
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

    const user = await prisma.user.update({
      where: { id },
      data: {
        cardHolderName,
        familyName,
        family2: family2 || '',
        family3: family3 || '',
        family4: family4 || '',
        family5: family5 || '',
        phoneNumber,
        validTill: new Date(validTill)
      }
    });

    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'User not found' });
    } else if (error.code === 'P2002') {
      res.status(400).json({ 
        message: 'A user with this phone number already exists',
        field: 'phoneNumber'
      });
    } else {
      res.status(500).json({ 
        message: 'Error updating user',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
});

// Delete a user
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id }
    });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(500).json({ 
        message: 'Error deleting user',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
});

module.exports = router; 