import React from "react";

import "../../assets/styles/other/Spinner.css";

const Spinner = () => {
    // let sizeStyleClass = "large";
    
    // switch (size) {
    //     case "large":{
    //         sizeStyleClass = "large";
    //         break;
    //     }
    //     case "small":{
    //         sizeStyleClass = "small";
    //         break;
    //     }  
            
    
    //     default:
    //         break;
    // }
    return (
        // <div className={`spinner-overlay ${sizeStyleClass}`}>
        <div className={`spinner-overlay`}>
            <div className="spinner"></div>
        </div>
    );
};

export default Spinner;
