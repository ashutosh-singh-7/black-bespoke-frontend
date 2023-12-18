import { useContext, useEffect, useState } from "react";
import { SelectBtn, TabBtn } from "./elements/Buttons";
import { Spinner } from "./elements/Loaders";
import { ParaSec } from "./elements/Paras";
import { SubHeader } from "./elements/StyledHeaders";
import { WalledTexts } from "./elements/WalledTexts";
import { useGetSuitPartQuery } from "../queries/getSuitPartQuery";
import { CommonContext } from "../contexts/CommonContexts";

const BASE_URL = import.meta.env.VITE_API_HOST

export function SelectBlazerPattern({
    set_pictures,set_detail_id
}){
    const {updateSuitBuildStep} = useContext(CommonContext)
    const [selectedBlazer, set_selectedBlazer] = useState(null)
    const {data, isLoading, isSuccess, isError, refetch, status} =  useGetSuitPartQuery("/api/suit/blazer-pattern/all/", "blazer")
    const blazers = isSuccess ?  data?.data : []
    
    useEffect(()=>{
        if(!selectedBlazer && status =="success"){
            set_selectedBlazer(blazers[0] || {})
        } 
        
        set_pictures(selectedBlazer?.pictures || [])
        set_detail_id(selectedBlazer?.detail || null)
        updateSuitBuildStep("blazer", selectedBlazer?.id)
    }, [blazers, selectedBlazer, status])
    return(
            <div className="">
                <SubHeader classes="text-lg sm:text-xl 2xl:text-2xl ml-3">
                        <WalledTexts>
                        Select a blazer pattern
                        </WalledTexts>
                    </SubHeader>
                    <ParaSec classes="mt-2 mb-0">
                    Lorem ipsum dolor sit amet consectetur. Vestibulum tincidunt quam feugiat purus aliquet tellus.
                    </ParaSec>
                    <div className="w-full h-fit">
                        {
                            isLoading &&
                            <div className="w-full flex justify-center items-center">
                                <Spinner/>  
                            </div>
                        }
                        {
                            isSuccess && !isLoading &&
                            <div className="w-full grid grid-cols-1 gap-5 mt-8">
                                {
                                    blazers.map(blazer => {
                                        
                                    return   <TabBtn
                                    handleOnClick={ () => set_selectedBlazer(blazer)}
                                    title={blazer?.name}
                                    descr={blazer?.description}
                                    svg_url={BASE_URL + blazer?.icon}
                                    img_class="w-10 h-auto flex-none"
                                    classes={"w-full " +  
                                    ( selectedBlazer?.id == blazer?.id ? "bg-theme-gold/5 border-theme-gold" : "")}
                                 />
                                    })
                                }
                                <TabBtn
                                    handleOnClick={ () => set_selectedBlazer("no-blazer")}
                                    title="No Blazer"
                                    descr="I already have a blazer and don't want Black Bespoke to include another blazer."
                                    img_class="hidden"
                                    text_class="text-center items-center w-10/12 mx-auto"
                                    classes={"w-full " +  
                                    ( selectedBlazer == "no-blazer" ? "bg-theme-gold/5 border-theme-gold" : "")}
                                 />
                            </div>
                        }
                        {
                            isError &&
                            <p className="text-red-600 font-mono text-center text-sm px-5">
                                Oops! We couldn't fetch <br/> the blazers right now. 
                                <br/>
                                Please{" "}
                                <button 
                                    onClick={()=>refetch()}
                                    className="underline"
                                    >try again</button>.
                            </p>
                        }
                    </div>

            </div>
    )
}