/* eslint-disable no-unused-vars */
import React from 'react';
import {  useUser, Protect } from '@clerk/clerk-react';
import { Eraser, FileText, Hash, House, Image, Scissors, SquarePen, Users,LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: Users }
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();

  return (
    <Protect>
      <div className={`sidebar ${sidebar ? 'open' : ''}`}>
        <div className="sidebar-top">
          <img src={user.imageUrl} alt="User avatar" className="avatar" />
      <h1 className="user-name">
   { user?.firstName?.charAt(0)?.toUpperCase() + user?.firstName?.slice(1) || ''}
  {' '}
  {user?.lastName?.charAt(0)?.toUpperCase() + user?.lastName?.slice(1) || ''}
</h1>

        </div>

        <div className="nav-links">
    
          
          {navItems.map(({ to, label, Icon }) => (
            
  <NavLink
    key={to}
    to={to}
    end={to === '/ai'}
    onClick={() => setSidebar(false)}
    className={({ isActive }) => 
      `nav-item ${isActive ? 'active' : ''}`
    }
    
  >
    <Icon className="icon" />
    <span>{label}</span>
  </NavLink>
))}

        </div>

      <div className="sidebar-bottom">
  <div className="profile-info" onClick={() => window.Clerk.openUserProfile()}>
    <img src={user.imageUrl} alt="avatar" className="profile-avatar" />
    <div className="user-details">
      <div className="user-name-sm">{user.fullName}</div>
      <div className="plan">
       {user.emailAddresses[0]?.emailAddress || 'No Email'}
      </div>
    </div>
  </div>

  <div className="logout-icon">
    <LogOut appearance={
      {
        variables: {
          colorTextPrimary: '#ffffff',
          fontFamily: "Google Sans",
          fontSize: '16px',
        },
      }
    } onClick={() => window.Clerk.signOut()} />
  </div>
</div>

      </div>
    </Protect>
  );
};

export default Sidebar;

