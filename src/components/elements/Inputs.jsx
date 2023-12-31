import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

export function TextInput({
    type="text",
    classes="", id="", label="", placeholder="", name="" ,is_error=false, bottom_msg="",
    input_left_elm="", input_right_elm="", defaultValue="", readOnly=false,
    value: controlledValue, // Rename to avoid conflicts with value prop
    onChange: controlledOnChange, // Rename to avoid conflicts with onChange prop
}){
    const tw_classes = `w-full text-sm font-theme-gilroy text-theme-white font-medium h-fit`
    
    const [inputValue, setInputValue] = useState(defaultValue || ''); // Use defaultValue if provided
    useEffect(()=>{
        if(defaultValue){
            setInputValue(defaultValue)
        }
    }, [defaultValue])
    const [input_focus, set_input_focus] = useState(false)
    const onInputFocus = (e) => {
        set_input_focus(true)
    }
    const onInputBlur = (e) => {
        set_input_focus(false)
    }
    const handleChange = (e) => {
        setInputValue(e.target.value);
        if (controlledOnChange) {
            controlledOnChange(e);
        }
    };
    const inputProps = {
        type,
        id,
        className: 'text-base block w-full px-3 py-2 bg-theme-grey outline-none placeholder:text-theme-white/40 caret-theme-gold',
        placeholder,
        name,
        onFocus: onInputFocus,
        onBlur: onInputBlur,
        value: controlledValue !== undefined ? controlledValue : inputValue,
        onChange: controlledOnChange !== undefined ? controlledOnChange : handleChange,
        readOnly,
    };
    return(
        <div className={twMerge(tw_classes, classes)}>
        <label
            htmlFor={id}
            className="block mb-1 text-sm text-theme-white/60"
        >
            {label}
        </label>
        <div 
            className="flex flex-row justify-center items-center w-full h-fit rounded overflow-hidden 
            border-[1px] border-transparent"
            style={input_focus ? is_error ? {borderColor: "#ff3333"} : {borderColor: "#D9B982"} : {}}
        >
            {input_left_elm}
            <input
                {...inputProps}
            />
            {input_right_elm}
        </div>
        <p className="mt-1 text-xs" style={ is_error ?  {color: "#ff3333"} : {}}>
            {bottom_msg}
        </p>
        </div>

    )
}
export function TextAreaInput({
    input_class="",
    className="", id="", label="", placeholder="", name="" ,is_error=false, bottom_msg="",
    input_left_elm="", input_right_elm="", defaultValue="", readOnly=false,
    value: controlledValue, // Rename to avoid conflicts with value prop
    onChange: controlledOnChange, // Rename to avoid conflicts with onChange prop
}){
    const tw_classes = `w-full text-sm font-theme-gilroy text-theme-white font-medium h-fit`
    
    const [inputValue, setInputValue] = useState(defaultValue || ''); // Use defaultValue if provided
    useEffect(()=>{
        if(defaultValue){
            setInputValue(defaultValue)
        }
    }, [defaultValue])
    const [input_focus, set_input_focus] = useState(false)
    const onInputFocus = (e) => {
        set_input_focus(true)
    }
    const onInputBlur = (e) => {
        set_input_focus(false)
    }
    const handleChange = (e) => {
        setInputValue(e.target.value);
        if (controlledOnChange) {
            controlledOnChange(e);
        }
    };
    const inputProps = {
        id,
        className: twMerge('text-base block w-full px-3 py-2 bg-theme-grey outline-none placeholder:text-theme-white/40 caret-theme-gold', input_class),
        placeholder,
        name,
        onFocus: onInputFocus,
        onBlur: onInputBlur,
        value: controlledValue !== undefined ? controlledValue : inputValue,
        onChange: controlledOnChange !== undefined ? controlledOnChange : handleChange,
        readOnly,
    };
    return(
        <div className={twMerge(tw_classes, className)}>
        <label
            htmlFor={id}
            className="block mb-1 text-sm text-theme-white/60"
        >
            {label}
        </label>
        <div 
            className="flex flex-row justify-center items-center w-full h-fit rounded overflow-hidden 
            border-[1px] border-transparent"
            style={input_focus ? is_error ? {borderColor: "#ff3333"} : {borderColor: "#D9B982"} : {}}
        >
            {input_left_elm}
            <textarea
                {...inputProps}
            />
            {input_right_elm}
        </div>
        <p className="mt-1 text-xs" style={ is_error ?  {color: "#ff3333"} : {}}>
            {bottom_msg}
        </p>
        </div>

    )
}

export function StyledRadioLoc({
    src="/tests/test-location.svg", name="Location", citySelected, setCitySelected,
    id
}){
    
   

    return (
        <button
            onClick={()=>setCitySelected(id)}
            className="flex flex-col justify-center items-center overflow-hidden text-theme-white font-theme-gilroy
            border-2 border-theme-white bg-theme-grey cursor-pointer py-5 sm:py-0
            "
            style={citySelected == id ? {borderColor: "#D9B982", backgroundColor: "rgb(217 185 130 / 0.1)"} : {}}
        >
            <img className="inline-block w-12 sm:w-20 h-auto object-contain" src={src} alt={name}/>
            <span>{name}</span>
        </button>
    )
}