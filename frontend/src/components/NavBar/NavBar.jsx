import React from 'react';
import { assets } from "../../assets/assets";

import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Navbar.css'; 
import { useClerk,useUser,UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const navigate = useNavigate();
  const {user}=useUser();
  const {openSignIn} = useClerk();


  return (
   <div className="navbar">
  <div className="navbar-inner">
    <img
      src={assets.logo}
      alt="logo"
      className="navbar-logo"
      onClick={() => navigate('/')}
    />

    {
      user ? <UserButton  appearance={{
    elements: {
      userButtonAvatarBox: {
        width: "44px",
        height: "44px",
      },
    },
  }} />:(
           <button onClick={openSignIn} className="get-started-button">
      Get started <ArrowRight size={16} />
    </button>
      )
    }
   
  </div>
</div>

  );
};

export default Navbar;
