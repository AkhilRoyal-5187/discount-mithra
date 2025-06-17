import React from 'react';

const ProtectedRoute = ({ children }) => {
  // Remove authentication check and directly return children
  return children;
};

export default ProtectedRoute; 