import React from 'react'
import Navbar from '../../components/NavBar/NavBar.jsx'
import Hero from '../../components/Hero/Hero.jsx'
import AiTools from '../../components/AiTools/AiTools.jsx'
import Testimonials from '../../components/Testimonials/Testimonials.jsx'
import Plan from '../../components/Plan/Plan.jsx'
import Footer from '../../components/Footer/Footer.jsx'

const Home = () => {
  return (
    <>
        <Navbar />
        <Hero />
        <AiTools/>
        <Testimonials />
        <Plan />
        <Footer/>
    </>
  
    
  )
}

export default Home