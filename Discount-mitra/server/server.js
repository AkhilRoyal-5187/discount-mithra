// server.js

// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // Required for serving static files in production

// Load environment variables from .env file
dotenv.config();

// Log environment variables (excluding sensitive data) for debugging
console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not set (using fallback)');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set'); // Check if JWT_SECRET is set
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');

// Initialize Express app
const app = express();

// --- Middleware --- //

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors()); // Allow all origins

// Enable the express.json middleware to parse JSON request bodies
app.use(express.json());

// Enhanced logging middleware for incoming requests
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.url}`);
  
  // Log headers for all requests
  if (req.headers) {
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
  }
  
  // Log body only for non-GET requests
  if (req.method !== 'GET' && req.body) {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  
  next();
});

// --- Database Connection --- //

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/discount-mitra', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected successfully.');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process with an error code if DB connection fails
});

// --- API Routes --- //

// Import and use your route files
console.log('Importing routes...');
try {
  const adminRoutes = require('./routes/admin'); // Assuming your admin routes are in routes/admin.js
  const userRoutes = require('./routes/users');   // Your user routes from routes/users.js (note the 'users' for consistency)

  console.log('Registering routes...');
  // Use the admin routes for any request starting with /api/admin
  app.use('/api/admin', adminRoutes);
  // Use the user routes for any request starting with /api/users
  app.use('/api/users', userRoutes);
  
  console.log('Routes registered successfully.');
} catch (error) {
  console.error('Error importing or registering routes:', error);
  process.exit(1); // Exit if routes cannot be loaded
}

// Test route to confirm API is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working successfully!' });
});

// --- Error Handling Middleware --- //

// Centralized error handling for all routes
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// --- 404 Not Found Handler --- //

// Catch-all for any routes not defined
app.use((req, res) => {
  console.log(`404 Not Found: ${req.method} ${req.url}`);
  res.status(404).json({ message: 'The requested resource was not found.' });
});

// --- Server Static Files in Production --- //

// Serve static files from the React app (or any frontend build) in production environment
if (process.env.NODE_ENV === 'production') {
  console.log('Serving static files from client/build for production environment.');
  // Set the static folder
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  // For any other requests, serve the index.html file of the React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Serve static files with proper MIME types
app.use(express.static(path.join(__dirname, '../client/build'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Serve manifest.json with proper headers
app.get('/manifest.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendFile(path.join(__dirname, '../client/public/manifest.json'));
});

// --- Server Start --- //

// Get the port number from environment variables, or default to 8000
const PORT = process.env.PORT || 8000;

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`MongoDB URI: ${process.env.MONGO_URI ? 'Connected via .env' : 'Using fallback localhost'}`);
  console.log('--- Available API Routes (examples) ---');
  console.log(`- GET: /api/test (check if API is working)`);
  console.log(`- /api/admin/... (for admin-related routes)`);
  console.log(`- /api/users/... (for user-related routes)`);
  if (process.env.NODE_ENV === 'production') {
    console.log('Note: In production, all unmatched routes will serve the client-side application.');
  }
});