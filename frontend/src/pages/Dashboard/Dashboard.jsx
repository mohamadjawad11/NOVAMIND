import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../../assets/assets'
import { Gem, Sparkles } from 'lucide-react'
import './Dashboard.css'
import { Protect } from '@clerk/clerk-react';
import CreationItem from '../../components/CreationItem/CreationItem';



const Dashboard = () => {
  const [creations, setCreations] = useState([])

  const getDashboardData = async () => {
    setCreations(dummyCreationData)
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

  <div className="recent-creations-section">
    <p className="recent-creations-header">Recent Creations</p>
    {
      creations.map((item) => <CreationItem key={item.id} item={item} />)
    }
  </div>
</div>

  )
}

export default Dashboard
