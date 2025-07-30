import React, { useState } from 'react';
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
    <SignIn appearance={{
      variables: {
        fontFamily: "'Poppins', sans-serif",
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }} />
  );
};

export default Layout;
