const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const adminAuth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'No authentication token, access denied' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find admin by id
    const admin = await Admin.findOne({ 
      _id: decoded.adminId,
      isActive: true 
    });

    if (!admin) {
      return res.status(401).json({ 
        success: false,
        message: 'Admin not found or inactive' 
      });
    }

    // Add admin to request object
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false,
      message: 'Token is invalid or expired' 
    });
  }
};

module.exports = adminAuth; 