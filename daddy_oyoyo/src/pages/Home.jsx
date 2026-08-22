import Hero from '../components/Hero'
import About from '../components/About'
import Audience from '../components/Audience'
import Content from '../components/Content'
import Collaborations from '../components/Colaborations'
import Media from '../components/Media'
import SocialsCarousel from '../components/SolarSocials'
import Contact from '../components/Contacts'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <div id="top"><Hero /></div>
      <div id="about"><About /></div>
      <div id="audience"><Audience /></div>
      <div id="content"><Content /></div>
      <div id="collaborations"><Collaborations /></div>
      <div id="media"><Media /></div>
      <div id="socials"><SocialsCarousel /></div>
      <div id="contact"><Contact /></div>
      <Footer />
    </>
  )
}

export default Home