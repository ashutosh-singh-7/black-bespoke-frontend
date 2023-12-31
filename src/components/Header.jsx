import { Link } from "react-router-dom";
import { ContainerDiv } from "./elements/Container";
import { SVGWrapper } from "./elements/SVGWrapper";
import { NavLinkBtn, PrimaryBtnTwo, SecondaryBtn } from "./elements/Buttons";
import { useContext } from "react";
import { CommonContext } from "../contexts/CommonContexts";
import { twMerge } from "tailwind-merge";

// export default function Header(){
//     const {setShowSidebar} = useContext(CommonContext)
//     return (
//         <header className="w-full bg-theme-black/40 fixed top-0 z-40 py-3 backdrop-blur-[2px]">
//             <ContainerDiv classes="flex flex-row justify-between items-center ">
//                 <Link to="/" className="flex justify-center items-center">
//                     <SVGWrapper classes="w-6 sm:w-8 h-6 sm:h-8 fill-theme-gold" svgName="BRAND"/>
//                 </Link>
//                 <nav className="hidden sm:flex flex-row justify-center items-center gap-5">
//                     <NavLinkBtn href="/" >
//                         Home
//                     </NavLinkBtn>
//                     <NavLinkBtn href="/process/" >
//                         Our Process
//                     </NavLinkBtn>
//                     <NavLinkBtn href="/suit-build/?select=fabric" >
//                         Build Suit
//                     </NavLinkBtn>
//                     <NavLinkBtn href="/track/" >
//                         Track Order
//                     </NavLinkBtn>
//                     <NavLinkBtn href="/contact/" >
//                         Contact Us
//                     </NavLinkBtn>
//                 </nav>
//                 <SecondaryBtn handleOnClick={()=>setShowSidebar(true)}  classes=" focus:ring-2 hover:bg-theme-white/10 focus:ring-theme-white/10 p-1 text-theme-white">
//                     <SVGWrapper classes="w-6 sm:w-8 h-6 sm:h-8 fill-theme-white" svgName="MENU"/>
//                 </SecondaryBtn>
//             </ContainerDiv>
//         </header>
//     )
// }
export default function Header({btn_text="Build your suit", btn_fun, btn_class="", children}){
    return (
        <header className="header_gradient fixed top-0 z-50 w-full">
            <ContainerDiv
            classes="mx-auto flex justify-between items-center pt-8 "
            >
                {children}
                <PrimaryBtnTwo
                className={twMerge("ml-auto hidden sm:inline-flex ",btn_class)}
                title={btn_text}
                handleOnClick={btn_fun}
                >
                {btn_text}
                </PrimaryBtnTwo>
                
            </ContainerDiv>
        </header>
    )
}