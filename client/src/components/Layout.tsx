import React, { ReactNode } from 'react';
import NavBar from './NavBar';
import StudentProfile from '../home/StudentPage/StudentProfile';
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ paddingTop: '64px', minHeight: '100vh', boxSizing: 'border-box' }}>
      <NavBar />
      <StudentProfile/>
        {children}
    </div>
  );
};

export default Layout;
