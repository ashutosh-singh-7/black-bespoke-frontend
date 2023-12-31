import { useContext, useEffect, useState } from "react";
import { TabBtn } from "../elements/Buttons";
import { Spinner } from "../elements/Loaders";
import { ParaPrmBeta, ParaSec } from "../elements/Paras";
import { SubHeader, SubHeaderBeta } from "../elements/StyledHeaders";
import { WalledTexts } from "../elements/WalledTexts";
import { useGetSuitPartQuery } from "../../queries/getSuitPartQuery";
import { CommonContext } from "../../contexts/CommonContexts";

const BASE_URL = import.meta.env.VITE_API_HOST

export default function SelectWaistcoatPattern({
    set_pictures,set_detail_id, suit
}){
    const {updateSuitBuildStep} = useContext(CommonContext)
    const [selectedWaistcoat, set_selectedWaistcoat] = useState(suit?.waistcoat_pattern)
    const {data, isLoading, isSuccess, isError, refetch, status} =  useGetSuitPartQuery("/api/suit/waistcoat-pattern/all/", "waistcoat-pattern")
    const waistcoats = isSuccess ?  data?.data : []
    
    useEffect(()=>{
        if(!selectedWaistcoat && status =="success"){
            set_selectedWaistcoat(waistcoats[0]?.id || {})
        } 
        
        const update_build_stages = (step_id, parts_list ,selectedPart_id) => {
            const selected_part = parts_list.find(part => part?.id == selectedPart_id)
            if(selected_part){
                set_pictures(selected_part?.pictures || [])
                set_detail_id(selected_part?.detail || null)
                updateSuitBuildStep(step_id, selected_part?.id)
            }
        }
        update_build_stages("waistcoat_pattern", waistcoats ,selectedWaistcoat)
    }, [waistcoats, selectedWaistcoat, status])
    return(
            <div className="">
                <SubHeaderBeta className="text-lg sm:text-2xl 2xl:text-3xl ml-3">
                        <WalledTexts>
                        Select Waistcoat pattern.
                        </WalledTexts>
                    </SubHeaderBeta>
                    <ParaPrmBeta className="mt-2 mb-7 text-sm 2xl:text-lg">
                    Lorem ipsum dolor sit amet consectetur. Vestibulum tincidunt quam feugiat purus aliquet tellus.
                    </ParaPrmBeta>
                    <div className="w-full h-fit">
                        {
                            isLoading &&
                            <div className="w-full flex justify-center items-center">
                                <Spinner/>  
                            </div>
                        }
                        {
                            isSuccess && !isLoading &&
                            <div className="w-full grid grid-cols-1 gap-5 mt-10">
                                {
                                    waistcoats.map(waistcoat => {
                                        
                                    return   <TabBtn
                                    handleOnClick={ () => set_selectedWaistcoat(waistcoat?.id)}
                                    title={waistcoat?.name}
                                    descr={waistcoat?.description}
                                    svg_url={BASE_URL + waistcoat?.icon}
                                    img_class="w-10 h-auto flex-none"
                                    classes={"w-full " +  
                                    ( selectedWaistcoat == waistcoat?.id ? "bg-theme-gold/5 border-theme-gold" : "")}
                                 />
                                    })
                                }
                                <TabBtn
                                    handleOnClick={ () => set_selectedWaistcoat("no-waistcoat")}
                                    title="No Waistcoat"
                                    descr="I already have a waistcoat and don't want Black Bespoke to include another waistcoat."
                                    img_class="hidden"
                                    text_class="text-center items-center w-10/12 mx-auto"
                                    classes={"w-full " +  
                                    ( selectedWaistcoat == "no-waistcoat" ? "bg-theme-gold/5 border-theme-gold" : "")}
                                 />

                            </div>
                        }
                        {
                            isError &&
                            <p className="text-red-600 font-mono text-center text-sm px-5">
                                Oops! We couldn't fetch <br/> the waistcoats right now. 
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