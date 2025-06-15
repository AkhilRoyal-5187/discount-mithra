const jwt = require('jsonwebtoken');

// Dummy middleware: always allow
const authenticateToken = (req, res, next) => {
  // For development, skip all checks
  req.user = { adminId: 'dummy' }; // Optionally set a dummy user
  next();
};

module.exports = { authenticateToken }; 