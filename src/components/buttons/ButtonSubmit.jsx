



import { useState } from 'react';
import '../../assets/styles/buttons/ButtonSubmit.css'
import useLocalizedNavigate from '../../utils/useLocalizedNavigate';


export default function ButtonSubmit({ isColorsInverse=false, themeColor="yellow", href="/", spanText="КНОПКА", size="",onClick}) {
    const navigate = useLocalizedNavigate();
    let styleClass = themeColor === "yellow" ? 
    (isColorsInverse ? "reverse-submit-button" : "submit-button") : 
    (isColorsInverse ? "reverse-transparent-submit-button" : "transparent-submit-button");
    let widthButton = 350;
    let heightButton = 70;

    switch (size) {
        case "s":
            widthButton = 290;
            heightButton = 60;
            break;
        case "md":
            widthButton = 350;
            heightButton = 70;
            break;
        case "lg":
            widthButton = 400;
            heightButton = 80;
            break;
        default:

            break;
    }

    if(href==="none"){
        return (
            <button 
                className={styleClass} 
                onClick={onClick} 
                style={{ width: widthButton, height: heightButton }}
            >
                {spanText}
            </button>
        )
    } else {
        return (
            <button 
                className={styleClass} 
                onClick={()=>{
                    navigate(href);
                    //window.location.href=href;
                }} 
                style={{ width: widthButton, height: heightButton }}
            >
                {spanText}
            </button>
        )
    }


}
