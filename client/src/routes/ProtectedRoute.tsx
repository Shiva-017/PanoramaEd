// ProtectedRoute.jsx

import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

interface ProtectedRouteProps {
    element: any // Change this type based on your specific needs
  }
  
const ProtectedRoute: React.FC<ProtectedRouteProps>  = ({ element }) => {
  // Check if the user is authenticated (you can modify this logic)
  const isAuthenticated = () => {
    const userLoggedIn = window.localStorage.getItem('user');
    return !!userLoggedIn;
  };

  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
