import { useContext, useEffect, useState } from "react";
import { SelectBtn } from "./elements/Buttons";
import { Spinner } from "./elements/Loaders";
import { ParaSec } from "./elements/Paras";
import { SubHeader } from "./elements/StyledHeaders";
import { WalledTexts } from "./elements/WalledTexts";
import { useGetSuitPartQuery } from "../queries/getSuitPartQuery";
import { CommonContext } from "../contexts/CommonContexts";

const BASE_URL = import.meta.env.VITE_API_HOST

export function SelectFabric({
    set_pictures,set_detail_id,
}){
    const [selectedFabric, set_selectedFabric] = useState(null)
    const {updateSuitBuildStep} = useContext(CommonContext)
    const {data, isLoading, isSuccess, isError, refetch, status} =  useGetSuitPartQuery("/api/suit/fabric/all/", "fabric")
    const fabrics = isSuccess ?  data?.data : []
    useEffect(()=>{
        if(!selectedFabric && status =="success"){
            set_selectedFabric(fabrics[0] || {})
        } 
        
        set_pictures(selectedFabric?.pictures || [])
        set_detail_id(selectedFabric?.detail || null)
        updateSuitBuildStep("fabric", selectedFabric?.id)
    }, [fabrics, selectedFabric, status])
    return(
            <div className="">
                <SubHeader classes="text-lg sm:text-xl 2xl:text-2xl ml-3">
                        <WalledTexts>
                        Select a fabric to customize your suit
                        </WalledTexts>
                    </SubHeader>
                    <ParaSec classes="mt-2 mb-7">
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
                            <div className="w-full grid grid-cols-2 gap-5">
                                {
                                    fabrics.map(fabric => {
                                    return  <SelectBtn
                                            handleSelectFabric={ () => set_selectedFabric(fabric)}
                                            key={fabric.id}
                                            src={BASE_URL + fabric.icon}
                                            text={fabric.name}
                                            isSelected={selectedFabric?.id == fabric?.id}
                                        />
                                    })
                                }

                            </div>
                        }
                        {
                            isError &&
                            <p className="text-red-600 font-mono text-center text-sm px-5">
                                Oops! We couldn't fetch <br/> the fabrics right now. 
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