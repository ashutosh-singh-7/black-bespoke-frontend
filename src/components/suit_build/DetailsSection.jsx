import { lazy, useEffect, useState } from "react";
import { PrimaryBtn, PrimaryBtnTwo, SecondaryBtn } from "../elements/Buttons";
import { ContainerDiv } from "../elements/Container";
import { SVGWrapper } from "../elements/SVGWrapper";
import { twMerge } from "tailwind-merge";
import { useGetSuitPartDetailQuery } from "../../queries/getSuitPartDetail";
const  DetailOne = lazy(()=>import("./SuitPartDetails"));

const currencies = {
    "INR": "₹",
    "USD": "$",
}
const next_texts = {
    fabric:"NEXT", 
    blazer: "NEXT",
    waistcoat_pattern:"NEXT",
    waistcoat_lapel:"NEXT",
    pant_style:"NEXT",
    shirt_color:"NEXT",
    monogram:"BOOK NOW"
}
const back_texts = {
    fabric:"GET EXPERT HELP", 
    blazer: "PREVIOUS",
    waistcoat_pattern:"PREVIOUS",
    waistcoat_lapel:"PREVIOUS",
    pant_style:"PREVIOUS",
    shirt_color:"PREVIOUS",
    monogram:"PREVIOUS"
}
export default function DetailsSection({
    next_fn, back_fn, detail_id, select_stage
}){
    const [show_detail, set_show_detail] = useState(false)
    
    const {data, isLoading, isError, isSuccess, refetch, status} = useGetSuitPartDetailQuery(detail_id)
    useEffect(()=>{
        refetch()
    }, [detail_id, status])

    const detail = isSuccess ? data?.data : {}


    return(
        
            <div 
                className="w-full fixed bottom-0 flex-none h-24 transition-all py-3 bg-theme-gradient-grey z-40"
                style={{height: show_detail ? "12rem" : null}}
            >
                <ContainerDiv 
                    classes="h-full flex justify-between items-center gap-3 sm:gap-5"
                    style={{ alignItems: show_detail? "start": null}}
                >
                        <button 
                            className={`h-full text-ellipsis 
                            text-theme-white font-theme-mulish text-sm w-fit text-start relative 
                            flex flex-col justify-start items-start
                            `}
                            disabled={window.innerWidth > 768}
                            onClick={()=>set_show_detail(prev => !prev)}
                        >
                        <span className="inline-block sm:md:w-40 text-ellipsis overflow-hidden">
                        {isSuccess ? detail?.description : "N/A"}
                        </span>
                        <span className="inline-block mt-1">
                         {currencies[detail?.currency]}
                         {isSuccess ? parseFloat(detail?.price) : "N/A"}
                        </span>
                        <SVGWrapper
                            svgName="ANGLE_LEFT"
                            classes={
                                twMerge("stroke-theme-gold fill-transparent w-4 h-5 ml-2 absolute -right-5  top-0 md:hidden transition-all", (show_detail ? "rotate-90" : "-rotate-90"))
                            }
                        />
                        </button>
                        <div 
                            className="w-full md:w-fit left-0 px-2 md:px-0 top-24 absolute md:static flex flex-row justify-center items-center gap-4 md:gap-7"
                        >
                            <DetailOne
                                src="/media/composition.svg"
                                detail_name="Composition"                                
                                detail={isSuccess ? detail?.composition : "N/A"}
                                />
                            <DetailOne
                                src="/media/season.svg"
                                detail_name="Season"                                
                                detail={isSuccess ? detail?.season : "N/A"}
                                />
                            <DetailOne
                                src="/media/fineness.svg"
                                detail_name="Fineness"                                
                                detail={isSuccess ? detail?.fineness : "N/A"}
                                />
                            <DetailOne
                                src="/media/weight.svg"
                                detail_name="Weight"                                
                                detail={isSuccess ? detail?.weight : "N/A"}
                            />
                        </div>
                    <div className="w-fit flex flex-row justify-between items-center gap-1">
                        <SecondaryBtn
                            handleOnClick={back_fn}
                            classes={"py-[0.57rem] text-xs md:text-sm"}
                        >
                            <span>{back_texts[select_stage] || "PREVIOUS"}</span>
                        </SecondaryBtn>
                        <PrimaryBtnTwo
                            handleOnClick={next_fn}
                            className={"text-xs md:text-sm group"}
                            // disabled={next_disabled}
                        >
                            <span>{next_texts[select_stage] || "NEXT"}</span>
                            <SVGWrapper 
                                classes="stroke-theme-gold group-hover:stroke-theme-black fill-transparent w-4 h-5 ml-2 "
                                svgName="ANGLE_RIGHT"
                            />
                        </PrimaryBtnTwo>
                    </div>
                </ContainerDiv>
            </div>
    )
}