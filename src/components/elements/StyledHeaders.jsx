import "../../css/elements.css";
export function LinedHeader({classes="", leftLineClasses="", rightLineClasses="", children}){
    const tw_classes_main = "lined-headers " + classes
    const tw_classes_left_line = "gold-line " + leftLineClasses
    const tw_classes_right_line = "gold-line " + rightLineClasses
    return (
        <div className={tw_classes_main}>
            <span className={tw_classes_left_line}></span>
            <h2>{children}</h2>
            <span className={tw_classes_right_line}></span>
        </div>
    )
}
export function SubHeader({classes="text-xl sm:text-2xl", children}){
    const tw_classes = `text-theme-white font-medium font-theme-cirka` 
    return (
        <h3 className={tw_classes + " " + classes}>
            {children}
        </h3>
    )
}