import "./App.css";
import  { Route, Routes, useLocation,  } from "react-router-dom";
import React, { useEffect } from "react";

import {register} from "swiper/element/bundle";
import { useContext } from "react";
import { CommonContext } from "./contexts/CommonContexts";
import { PrimaryAnchorBtn } from "./components/elements/Buttons";
import { SVGWrapper } from "./components/elements/SVGWrapper";
import { twMerge } from "tailwind-merge";

const ApptWalkthrough = React.lazy(()=>import("./components/pop_ups/ApptWalkthrough"));
const Sidebar = React.lazy(()=> import("./components/Sidebar"))
const OurProcess = React.lazy(()=> import("./pages/process/Process"))
const SuitBuild = React.lazy(()=> import("./pages/suit_build/SuitBuild"))
const Home = React.lazy(()=> import("./pages/home/Home"))
const Contact = React.lazy(()=> import("./pages/contact/Contact"))

register();

function App() {
  const {showSidebar, setShowSidebar, walkthroughStage, setWalkthroughStage} = useContext(CommonContext)

  const location = useLocation()
 
  return (
    <>
      {showSidebar && <Sidebar setShowSidebar={setShowSidebar}/>}
      {
        walkthroughStage && 
          <ApptWalkthrough 
          walkthroughStage={walkthroughStage}  
          setWalkthroughStage={setWalkthroughStage}
          />
      }
      <PrimaryAnchorBtn href="https://api.whatsapp.com/send/?phone=%2B919559070660&text=Hello%20there!&type=phone_number&app_absent=0" target="_blank" classes={twMerge("fixed  right-10 bottom-10 z-50 rounded-full w-10 aspect-square flex justify-center items-center", location.pathname == '/suit-build/' &&  'bottom-[unset] top-10')}>
        <SVGWrapper
          svgName="WHATSAPP"
          classes="stroke-1 flex-none w-10 stroke-theme-gold fill-theme-gold"

        />
      </PrimaryAnchorBtn>
      <main className="bg-theme-black/50 min-h-fit">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/process" element={<OurProcess/>}/>
            <Route path="/suit-build" element={<SuitBuild/>}/>
            <Route path="/contact-us" element={<Contact/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App
