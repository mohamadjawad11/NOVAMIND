import React, { useEffect, useState } from 'react'
import { Gem, Sparkles } from 'lucide-react'
import './Dashboard.css'
import { Protect } from '@clerk/clerk-react';
import CreationItem from '../../components/CreationItem/CreationItem';
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const {getToken} = useAuth();

  const getDashboardData = async () => {
   try{
    const token = await getToken();
    const {data}=await axios.get('/api/user/get-user-creations',{
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
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <div className="dashboard-container">
  <div className="dashboard-top-row">
    <div className="dashboard-card">
      <div className="card-header">
        <p>Total Creations</p>
        <h3>{creations.length}</h3>
      </div>
      <div className="icon2">
        <Sparkles className="sparkle-icon" />
      </div>
    </div>

    <div className="dashboard-card">
      <div className="card-header">
        <p>Active Plan</p>
        <h3>
          <Protect plan="premium" fallback="Free">Premium</Protect>
        </h3>
      </div>
      <div className="icon3">
        <Gem className="sparkle-icon" />
      </div>
    </div>
  </div>
{
  loading ?(
    <div className='spinner-container'>
      <span className='loading' >loading...</span>
    </div>
  ):(
    <div className="recent-creations-section">
    <p className="recent-creations-header">Recent Creations</p>
    {
      creations.map((item) => <CreationItem key={item.id} item={item} />)
    }
  </div>
  )
}
  
</div>

  )
}

export default Dashboard
