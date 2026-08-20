import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Audience from '../components/Audience'
import Content from '../components/Content'
const Home = () => {
  return (
    <div>
        <Hero />
        <About/>
        <Audience/>
        <Content/>
    </div>
  )
}

export default Home