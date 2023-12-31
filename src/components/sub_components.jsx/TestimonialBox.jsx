import {Suspense, lazy} from "react";
import { twMerge } from "tailwind-merge";
import { ParaPrmBeta } from "../elements/Paras";
const ImageElm = lazy(()=>import("../elements/Images"))

const BASE_URL = import.meta.env.VITE_CDN_HOST

export function TestimonialBox({className, img_src, name, testimonial}){
   
    return(
        <div className={twMerge("w-full h-fit grid grid-cols-7 glass_bg rounded-xl gap-5 sm:gap-10 2xl:gap-16 overflow-hidden", className)}>
            <div className="w-full sm:w-full h-full relative overflow-hidden col-span-3 sm:col-span-2">
                <Suspense fallback={<div>Loading...</div>}>
                    <ImageElm
                        classes="absolute inset-0"
                        src={BASE_URL + img_src}
                        alt={name}
                    />
                </Suspense>
            </div>
            <div className="w-full h-fit flex flex-col justify-between py-5 pr-5 sm:pr-10 p-10  pl-0 2xl:py-16 gap-5 2xl:gap-10 col-span-4 sm:col-span-5">
                <blockquote>
                    <ParaPrmBeta className="text-sm sm:text-lg">
                        {testimonial}
                    </ParaPrmBeta>
                </blockquote>
                <cite className="ml-auto flex not-italic gap-5 flex-row justify-center items-center text-theme-gold text-sm sm:text-base">
                ···
                <span>
                    {name}
                </span>
                    ···
                </cite>
            </div>
        </div>
    )
}