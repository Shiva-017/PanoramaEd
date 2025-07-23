import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedMentorRouteProps {
  element: React.ReactElement;
}

const ProtectedMentorRoute: React.FC<ProtectedMentorRouteProps> = ({ element }) => {
  const mentor = localStorage.getItem('mentor');
  const userType = localStorage.getItem('userType');
  
  if (!mentor || userType !== 'MENTOR') {
    return <Navigate to="/mentor-auth" replace />;
  }
  
  return element;
};

export default ProtectedMentorRoute;