import { useEffect, useState } from "react";
import {Section} from "@radix-ui/themes"
import { FaArrowRight,FaArrowUp } from 'react-icons/fa';
import PublicHeader from "../../components/header/public/PublicHeader";
import './Home.scss'




export default function Home() {
 const [showText, setShowText] = useState(false);
 const [backtoTopbutton, setBacktoTopbutton] = useState(false); 

useEffect(() =>{
  window.addEventListener("scroll", ()=>{
    if(window.scrollY > 200){
      setBacktoTopbutton(true);
    }else{
      setBacktoTopbutton(false);
    }
  })
}, [])
const scroolUp = () =>{
    window.scrollTo({
       top:0,
       behavior: "smooth"
    })
}


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
            {/* {backtoTopbutton && (
              <button style={{
                  position:"fixed",
                  bottom:"50px",
                  right:"50px",
                  height: "50px",
                  width:"50px",
              }}
              onClick={scroolUp}><FaArrowUp /></button>
            )} */}

              
               {/* <Section className="seconmain">
                <div className="img-secon">
                    <img src="/giphy.gif" alt="" />

                    <p className={`typing-text ${showText ? "show" : ""}`}><span className="das">Invest</span> <br />Effortlessly manage your finances with MungBean 🇻🇳. <br />Track income, expenses, and savings goals seamlessly. <br /> Take control of your financial future today 💰💰</p>
                </div>

              </Section> 
               */}
              
         
    </div>
  )
}
