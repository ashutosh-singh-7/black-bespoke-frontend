import { ParaSec } from "./Paras";

export function DetailOne({src, detail_name, detail}){
    return(
        <div className="h-fit text-center font-normal flex flex-col gap-1  justify-center items-center">
            <img src={src} alt={detail_name} className="w-7 h-auto"/>
        <ParaSec classes="text-center font-normal uppercase text-xs">
            <span >
                {detail_name}
            </span>
            <br/>
            <span className="font-semibold">
            {detail}
            </span>
        </ParaSec>
        </div>
    )
}