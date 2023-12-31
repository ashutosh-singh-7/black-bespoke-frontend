import { Suspense, lazy,useEffect, useState } from "react"
import { useLocation, useNavigate, useNavigationType } from "react-router-dom"
import { FullLogoSlogan } from "../../assets/Logos"
import {withHiddenVertScrollbar} from "../HOCs/SwitchOffScrolling"
import { PrimaryBtn } from "../elements/Buttons"
import { SVGWrapper } from "../elements/SVGWrapper"
import { Spinner } from "../elements/Loaders"
const CustomerForm = lazy(()=>import("./CustForm"))
const LocationSelect = lazy(()=>import("./LocationSelect"))
const AppointmentSelect = lazy(()=>import("./ApptSelect"))
const AppointmentConfirmed = lazy(()=>import("./AppointmentConfirmed"))
const AddressForm = lazy(()=>import("./AddrsForm")) 
const DateTimeSelect = lazy(()=>import("./DateTimeSelect")) 

function AppntLoader(){
    return (
        <div className="w-full h-full flex justify-center items-center 
            cursor-wait absolute inset-0 bg-black/50 z-10">
            <Spinner/>
        </div>
    )
}

function ApptWalkthrough({walkthroughStage}){
    const locaton = useLocation()
    const navigate = useNavigate()
    const [loading, set_loading] = useState(false)
    const navigation_type = useNavigationType()
    useEffect(()=>{
        // console.log(navigation_type)
        if(navigation_type=='POP'){
            navigate("?consult=info")
        }
    }, [navigation_type])
    function handleClose(){
        const pathname = locaton.pathname
        navigate(pathname.replace("suit-build/", ""))
    }
    
    return (
        <section 
            className="w-screen h-screen bg-theme-black/80 pt-24 sm:pt-0
            sm:bg-theme-black/60 fixed z-50 flex justify-center items-center overflow-y-auto sm:overflow-hidden">

            <div 
                className="w-full sm:w-11/12 md850:w-10/12 mt-auto sm:mt-[unset] h-[80%] sm:h-[90%] bg-theme-black 
                shadow-md rounded-sm flex flex-col sm:flex-row justify-center items-center "
            >
                <div className="bg-theme-black w-full sm:w-fit h-fit py-10 sm:h-full sm:px-5 
                md:px-10 md950:px-14 lg:px-20 flex-none flex justify-center items-center relative">
                    <FullLogoSlogan
                        
                        textSvgClasses="sm:w-40 md:w-52 h-16 md950:w-72 md950:h-24"
                    />
                    <PrimaryBtn 
                        handleOnClick={handleClose}
                        classes="p-1.5 rounded-full  absolute -top-16 sm:top-8 sm:left-8 md:top-10 md:left-10" 
                        title="close window"
                    >
                        <SVGWrapper classes="w-5 h-5 stroke-theme-gold" svgName="CLOSE"/>                   
                    </PrimaryBtn>
                </div>
                <div className="bg-theme-gradient-grey w-full h-fit sm:h-full relative">
                {loading &&
                    <AppntLoader/>
                }
                    {walkthroughStage == "info" && 
                    <Suspense fallback={<AppntLoader/>}>
                        <CustomerForm
                        set_loading={set_loading}
                        />
                    </Suspense>
                    }
                    {walkthroughStage == "loc" && 
                        <Suspense fallback={<AppntLoader/>}>
                            <LocationSelect 
                        set_loading={set_loading}
                        />
                        </Suspense>
                    }
                    {walkthroughStage == "appt_select" && 
                        <AppointmentSelect
                        set_loading={set_loading}
                        />
                    }
                    {walkthroughStage == "date_time" && 
                        <DateTimeSelect set_loading={set_loading} />
                    }
                    {walkthroughStage == "address" && 
                        <AddressForm set_loading={set_loading} />
                    }
                    {walkthroughStage == "booked" && 
                        <AppointmentConfirmed 
                        set_loading={set_loading}
                        />
                    }
                </div>
            </div>
        </section>
    )
}
export default withHiddenVertScrollbar(ApptWalkthrough)