import React, { ReactNode } from 'react';
import NavBar from './NavBar';
import StudentProfile from '../home/StudentPage/StudentProfile';

interface LayoutWithProfileProps {
  children: ReactNode;
}

const LayoutWithProfile: React.FC<LayoutWithProfileProps> = ({ children }) => {
  return (
    <div style={{ paddingTop: '64px', minHeight: '100vh', boxSizing: 'border-box' }}>
      <NavBar />
      <StudentProfile/>
        {children}
    </div>
  );
};

export default LayoutWithProfile;
