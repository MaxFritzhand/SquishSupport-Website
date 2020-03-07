import React, {useEffect } from 'react'
import Footer from '../Footer/Footer'
import bigboi from '../../assets/bigboi.png'
import aboutiphone from '../../assets/aboutiphone.png'
import Quotes from '../../assets/Quotes.png'
import '../../master.css'
import './about.css'

export default function About() {

  useEffect(() => {
    const navHome = document.getElementById("nav-home")
    const navLinks = document.getElementById("nav-links")
    navHome.classList.remove("white-bg")
    navLinks.classList.remove("purple-bg")
    navLinks.classList.add("modified")
  })




  return (
    <div className="wrapper aboutpage">
    <main>

    <div className="squishin-mission">
      <h1  className="homestyle purple about-header hector"><u>Our Squishin Mission</u></h1>
      <h2  className="mission-statement purple homestyle hector"><strong>Bringing people together through experience and overcoming life’s random hurdles</strong></h2>
    </div>
      <div className="about-content">
        <img className="bigboi" src={bigboi} alt="IPhone with Squish App"/>
      </div>

      <div className="about-right-content">
        <img className="right-content" src={aboutiphone} alt="Squish App Demo"/>

        <div className="quotesdiv">
          <img className="quotes" src={Quotes} alt="Quotes"/>
        </div>
      </div>

    </main>

    <Footer/>
  </div>

  )
}