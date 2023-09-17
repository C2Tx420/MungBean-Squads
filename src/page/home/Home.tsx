import { useEffect, useState } from "react";
import { useSquads } from "../../hook/useSquads";
import {Section} from "@radix-ui/themes"
import { FaArrowRight } from 'react-icons/fa';
import PublicHeader from "../../components/header/public/PublicHeader";
import './Home.scss'
import React, { useRef } from "react";




export default function Home() {
 const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div>
       <PublicHeader />
           <div className="container">
            <Section className="section1">
              <div className="titlemungbean">
            <h2>Application faster  <br />and better</h2>
            <p className={`typing-text ${showText ? "show" : ""}`}>
            Welcome to our website 😉! We are a leading electronic wallet platform. <br /> enabling you to manage digital assets and invest conveniently.<br />Join us now to explore unique investment opportunities through our <br /> electronic wallet.🎉<br />
            </p>

           <div className="btn"> 
           <a href="#" className="btnstart">
           Get Started <FaArrowRight className="arrow-icon" />
          </a>
            </div>
              </div>
             <div className="imagemungbean">
              <img src="/mungbean.png" alt=""  className="three-d-image"/>
             </div>
            </Section>
            </div> 
            

               {/* phan nay la phan 2
              {/* <div className="seconmain">
                <div className="img-secon">
                    <img src="/hihi.jpg" alt="" />
        
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi!</p>
                </div>

              </div> */}
              
              
         
    </div>
  )
}
