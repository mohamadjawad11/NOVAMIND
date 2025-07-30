import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { Menu, X } from 'lucide-react';
import SideBar from '../../components/SideBar/SideBar.jsx';
import { useUser, SignIn } from '@clerk/clerk-react';
import './Layout.css';

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    console.log(user); // Check if user object is populated properly
  }, [user]);

  return user ? (
    <div className="layout-container">
      <nav className="navbar">
        <img
          src={assets.logo}
          alt="NovaMind Logo"
          className="logo"
          onClick={() => navigate('/')}
        />
        {sidebar ? (
          <X className="menu-icon" onClick={() => setSidebar(false)} />
        ) : (
          <Menu className="menu-icon" onClick={() => setSidebar(true)} />
        )}
      </nav>

      <div className="main-content">
        <SideBar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="content-area">
          <Outlet />  
        </div>
      </div>
    </div>
  ) : (
    <div className="sign-in-wrapper">
      <SignIn appearance={{
        variables: {
          fontFamily: "'Poppins', sans-serif",
          fontSize: '16px',
        },
      }} />
    </div>
  );
};

export default Layout;
