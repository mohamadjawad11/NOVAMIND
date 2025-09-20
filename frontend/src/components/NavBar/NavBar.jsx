import React from 'react';

import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './NavBar.css'; 
import { useClerk,useUser,UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const navigate = useNavigate();
  const {user}=useUser();
  const {openSignIn} = useClerk();

  const handleNavigateHome= () => {
    navigate('/');
  }

  return (
   <div className="navbar">
  <div className="navbar-inner">
    <h1 className='navbar-logo' style={{color:"#417FF9FF",cursor:"pointer"}} onClick={handleNavigateHome}>NOVA<span style={{color:"#1F2BD4FF"}}>MIND</span></h1>

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
