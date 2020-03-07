import React, { useEffect } from 'react'
import Footer from '../Footer/Footer'
import john from '../../assets/profile/john.JPG'
import max from '../../assets/profile/max.png'
import diana from '../../assets/profile/diana.png'
import derek from '../../assets/profile/derek.png'
import andrew from '../../assets/profile/andrew.png'
import band from '../../assets/profile/band.png'
import emmanuel from '../../assets/profile/emmanuel.png'
import sweeney from '../../assets/profile/sweeney.jpg'
import naomi from '../../assets/profile/naomi.jpg'
import kerry from '../../assets/profile/kerry.jpg'
import './team.css'


export default function Team() {
  useEffect(() => {
    const navHome = document.getElementById("nav-home")
    const navLinks = document.getElementById("nav-links")
    navHome.classList.remove("white-bg")
    navLinks.classList.remove("purple-bg")
    navLinks.classList.add("modified")
  })

  return(
    <div className="wrapper teampage">
      <center><h1 id="team-header" class="white-2">Meet the Family</h1></center> 

      <div className="main">

        {/* First Row */}
        <div className="row-2">
          <div className="column">
            <div class="img__wrap">
              <div className="profile">
                <img src={john} id="profile-john" className="profile-pic" alt="John"/>
                  <div className="img__description">
                    <p className="hover-text">John is responsible for strategic oversight, innovation, and Squish’s overall performance. Utilizing creativity, rationality, and logic to accomplish Squish’s short and long term goals. John stresses unique ideas, which Squish’s engine. John has a bachelor's in mathematics, economics, and computer science with several years experience as a data science consultant </p>
                  </div>
              </div>
            </div>
              <div className="titling">
                <h2 className="white-2"> John Lang </h2>
                <p class="title white-2">CEO &amp; Founder</p>
              </div>
          </div>


          <div className="column">
            <div className="profile">
              <img src={max} id="profile-max" className="profile-pic" alt="Max"/>
          </div>
              <div className="titling">
                <h2 className="white-2"> Max Fritzhand </h2>
                <p class="title white-2">COO &amp; Founder</p>
            </div>
          </div>

          <div className="column">
          <div className="profile">
              <img src={derek} id="profile-derek" className="profile-pic" alt="Derek"/>
              </div>
       
              <div className="titling">
              <h2 className="white-2"> Derek Bullard </h2>
              <p class="title white-2">Lead Product Developer</p>
          </div>
         </div>

        </div>

        {/* Second Row */}

        <div className="row-2">
          <div className="column">
          <div className="profile">
              <img src={andrew} id="profile-andrew" className="profile-pic" alt="Andrew"/>
              </div>
  
              <div className="titling">
              <h2 className="white-2"> Andrew Hong </h2>
              <p class="title white-2">Full Stack Developer</p>
          </div>
          </div>
          <div className="column">
          <div className="profile">
              <img src={band} id="profile-band" className="profile-pic" alt="Band"/>
              </div>
         
              <div className="titling">
              <h2 className="white-2"> Band Ly </h2>
              <p class="title white-2">Full-Stack Developer</p>
              </div>
          </div>

          
        <div className="column">
          <div className="profile">
              <img src={emmanuel} id="profile-emmanuel" className="profile-pic" alt="Emmanuel"/>
              </div>
              {/* <div className="img_description">
                 <p className= "hover-text"> Emmanuel is ecstatic to be a part of the Squish family and looks forward to taking this opportunity to grow as a front-end developer. He seeks to refine his understanding of HTML, CSS, and Javascript as well as learning to use back-end languages such as PHP, Node, and React. </p>
              </div> */}
              <div className="titling">
              <h2 className="white-2"> Emmanuel Mehari </h2>
              <p class="title white-2">Front-End Developer</p>
              </div>
          </div>

        </div>


        {/* Third Row */}

        <div className="row-2">

        <div className="column">
          <div className="profile">
              <img src={diana} id="profile-diana" className="profile-pic" alt="Diana"/>
              </div>
         
              <div className="titling">
              <h2 className="white-2"> Diana Wang </h2>
              <p class="title white-2">Engagement Coordinator</p>
          </div>
          </div>


          <div className="column">
          <div className="profile">
              <img src={naomi} id="profile-naomi" className="profile-pic" alt="Naomi"/>
              </div>
      
              <div className="titling">
              <h2 className="white-2"> Naomi Ybarra </h2>
              <p class="title white-2">Social Media Guru</p>
          </div>
          </div>          

          <div className="column">
          <div className="profile">
              <img src={kerry} id="profile-kerry" className="profile-pic" alt="Kerry"/>
              </div>
           
              <div className="titling">
              <h2 className="white-2"> Kerry Keighran </h2>
              <p class="title white-2">Social Media Intern</p>
              </div>
          </div>
        </div>

        </div>

        {/* Fourth Row */}

        <div className="row-2" id="row-4">

        <div className="column">
          <div className="profile">
              <img src={sweeney} id="profile-sweeney" className="profile-pic" alt="John"/>
              </div>
              <div className="titling">
              <h2 className="white-2"> John Sweeney </h2>
              <p class="title white-2">Social Media Guru</p>
          </div>
          </div>

        <div className="column">
          <div className="profile">
              <img src={emmanuel} id="profile-emmanuel" className="profile-pic" alt="Emmanuel"/>
          </div>
          <div className="titling">
            <h2 className="white-2"> Emmanuel Mehari </h2>
             <p class="title white-2">Front-End Developer</p>
          </div>
        </div>

        </div>

        <Footer/>
      </div>
  
  )
}
