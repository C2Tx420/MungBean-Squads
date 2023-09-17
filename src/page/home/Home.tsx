import { useEffect, useState } from "react";
import { Button, Container, Section } from "@radix-ui/themes"
import PublicHeader from "../../components/header/public/PublicHeader";
import './Home.scss'
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";




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
      <Container size={"3"}>
        <section className="hero">
          <div className="hero__left">
            <p className="hero__left-title">Be Smart, Be Flex</p>
            <p className={"hero__left-content"}>
              Welcome to <span className="hero__left-content-brand">MungBean</span> 😉! We are a app with multiple shared pockets. 
              Enabling you to manage and invest conveniently. 
              Join us now to explore.🎉
            </p>
            <Link className="hero__left-btn" to={'/dashboard'}>
              <Button size={"4"}>
                Get Started
                <ArrowRightIcon/>
              </Button>
            </Link>
          </div>
          <div className="hero__right">
            <img src="/mungbean.png" alt="" className="three-d-image" />
            <div className="hero__right-glow"></div>
          </div>
        </section>
      </Container>
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

                    <p className={`typing-text ${showText ? "show" : ""}`}><span className="das">Invest</span> <br />Effortlessly manage your finances with MungBean 🇻🇳. <br />Track income, expenses, and savings goals seamlessly.Take control of your financial future today 💰💰</p>
                </div>

              </Section> 
               */}


    </div>
  )
}
