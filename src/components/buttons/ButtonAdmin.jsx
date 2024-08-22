



import { useState } from 'react';
import '../../assets/styles/buttons/ButtonAdmin.css'
import plusSvg from '../../assets/images/icons/other/plus.svg'

export default function ButtomAdmin({ themeColor = "black", href = "/", spanText = "КНОПКА", size = "", onClick }) {
    let styleClass = themeColor === "black" ? "admin-button" : "reverse-admin-button";
    let widthButton = 283;
    let heightButton = 39;

    switch (size) {
        // no placeholder span spanText=""
        case "xs":
            spanText="";
            widthButton = 57;
            heightButton = 39;
            break;
        case "s":
            widthButton = 217;
            heightButton = 39;
            break;
        case "md":
            widthButton = 255;
            heightButton = 39;
            break;
        case "lg":
            widthButton = 283;
            heightButton = 39;
            break;
        default:

            break;
    }

    if (href === "none") {
        return (
            <button
                className={styleClass}
                onClick={onClick}
                style={{ width: widthButton, height: heightButton, backgroundPosition: spanText==="" ? "51% 51%" : ""}}
            >
                {spanText}
            </button>
        )
    } else {
        return (
            <button
                className={styleClass}
                onClick={() => {
                    window.location.href = href;
                }}
                style={{ width: widthButton, height: heightButton }}
            >
                    {spanText}
            </button>
        )
    }


}
