



import { useState } from 'react';
import '../../assets/styles/buttons/ButtonSubmit.css'


export default function ButtonSubmit({ isColorsInverse=false, themeColor="yellow", href="/", spanText="КНОПКА", size="",onClick}) {
    let styleClass = themeColor === "yellow" ? 
    (isColorsInverse ? "reverse-submit-button" : "submit-button") : 
    (isColorsInverse ? "reverse-transparent-submit-button" : "transparent-submit-button");
    let widthButton = 350;
    let heightButton = 70;

    switch (size) {
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

    return (
        <button 
            className={styleClass} 
            onClick={()=>{
                window.location.href=href;
            }} 
            style={{ width: widthButton, height: heightButton }}
        >
            {spanText}
        </button>
    )
}
