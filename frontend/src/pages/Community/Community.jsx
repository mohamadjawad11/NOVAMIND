import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { dummyPublishedCreationData } from '../../assets/assets';
import { Heart } from 'lucide-react';
import './Community.css';

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();

  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData);
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return (
    <div className="community-container">
      <h2 className="community-title">Creations</h2>
      <div className="community-grid">
        {creations.map((creation, index) => (
          <div key={index} className="creation-card">
            <img src={creation.content} alt='' className="creation-image" />
            <div className="creation-overlay">
              <p className="creation-prompt">{creation.prompt}</p>
              <div className="creation-likes">
                <p>{creation.likes.length}</p>
                <Heart
                  className={`creation-heart ${creation.likes.includes(user?.id) ? 'liked' : ''}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
