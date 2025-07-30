import React from 'react';
import './Hero.css';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Hero = () => {
    const navigate = useNavigate();
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">
          Create amazing content<br />with <span className="highlight">AI tools</span>
        </h1>
        <p className="hero-description">
          Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.
        </p>
             <div className="buttons-container">
            <button onClick={()=>navigate('/ai')}>Start creating now</button>
            <button>Watch demo</button>
            </div>

               <div className="trust-section">
                <img src={assets.user_group} alt="User group" className="trust-image" />
                <span className="trust-text">Trusted by 10k+ people</span>
                </div>
      </div>


    </div>
  );
};

export default Hero;
