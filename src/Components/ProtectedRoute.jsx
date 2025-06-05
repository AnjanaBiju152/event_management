import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const userData = sessionStorage.getItem('existingUser');
  const token = sessionStorage.getItem('token');

  if (!userData || !token) {
    console.log('ProtectedRoute: No user data or token, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  try {
    const parsedUser = JSON.parse(userData);
    console.log('ProtectedRoute: User role:', parsedUser.role); // Debug log
    if (requiredRole && parsedUser.role !== requiredRole) {
      console.log(`ProtectedRoute: Role mismatch, expected ${requiredRole}, got ${parsedUser.role}`);
      return <Navigate to="/login" replace />;
    }
    return children;
  } catch (error) {
    console.error('ProtectedRoute: Error parsing user data:', error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;