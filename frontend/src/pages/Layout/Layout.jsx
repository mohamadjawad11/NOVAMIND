import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
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

  const handleNavigateHome = () => {
    navigate('/');
  };

  return user ? (
    <div className="layout-container">
      <nav className="navbar">
        <h1 className='navbar-logo' style={{color:"#417FF9FF",cursor:"pointer"}} onClick={handleNavigateHome}>NOVA<span style={{color:"#1F2BD4FF"}}>MIND</span></h1>
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
