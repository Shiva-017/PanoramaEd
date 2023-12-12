import React, { ReactNode } from 'react';
import NavBar from './NavBar';
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ paddingTop: '64px', minHeight: '100vh', boxSizing: 'border-box' }}>
      <NavBar />
        {children}
    </div>
  );
};

export default Layout;
