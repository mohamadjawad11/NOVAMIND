import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';
import './Community.css';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const fetchCreations = async () => {
   try{
    const token = await getToken();
    const {data}=await axios.get('/api/user/get-published-creations',{
      headers:{
        'Authorization':`Bearer ${token}`,
      }
    });
    if(data.success){
      setCreations(data.creations);
    }else{
      toast.error(data.message);
    }
   }catch(error){
    toast.error(error?.response?.data?.message || error.message);
    console.log(error.message)
   }
    setLoading(false);
  };

  const imageLikeToggle = async(id) => {
    try{
      const token = await getToken();
      const {data}=await axios.post('/api/user/toggle-like-creation',{id},{
        headers:{
          'Authorization':`Bearer ${token}`,
        }
      });
      if(data.success){
        toast.success(data.message);
         fetchCreations();
      }else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error(error?.response?.data?.message || error.message);
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return !loading ? (
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
                <Heart onClick={() => imageLikeToggle(creation.id)} size={20} strokeWidth={1.5} 
                  className={`creation-heart ${creation.likes.includes(user?.id) ? 'liked' : ''}`}
                  />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ):(
    <div className='spinner-container'>
      <span className='loading' >loading...</span>
    </div>
  )
};

export default Community;
