



import { useState } from 'react';
import '../../assets/styles/buttons/CrudButton.css'
import editSvg from '../../assets/images/icons/other/edit.svg'
import deleteSvg from '../../assets/images/icons/other/delete.svg'
import editHoveredSvg from '../../assets/images/icons/other/editHovered.svg'
import deleteHoveredSvg from '../../assets/images/icons/other/deleteHovered.svg'

export default function ButtonCrud({ href = "none", svgType = "", onClick }) {
    let spanSvg;
    let spanHoverSvg;
    switch (svgType) {
        case "edit":
            spanSvg = editSvg;
            spanHoverSvg = editHoveredSvg;
            break;
        case "delete":
            spanSvg = deleteSvg;
            spanHoverSvg = deleteHoveredSvg;
            break;
        default:
            spanSvg = ""
            break;
    }

    const buttonStyle = {
        '--crud-img': `url(${spanSvg})`,
        '--crud-hover-img': `url(${spanHoverSvg})`
    };

    if (href === "none") {
        return (
            <button
                className="crud-button"
                onClick={onClick}
                style={buttonStyle}
            >

            </button>
        )
    } else {
        return (
            <button
                className="crud-button"
                style={buttonStyle}
                onClick={() => {
                    window.location.href = href;
                }}
            >
            </button>
        )
    }


}
