import React from 'react';
import '../../assets/styles/other/SiteMainHeaderSpan.css'


export default function SiteMainHeaderSpan({ size }) {
    let styleClassL = "low-header-span-md";
    let styleClassB = "low-header-span-md";
    switch (size) {
        case "md":
            styleClassL = "low-header-span-md";
            styleClassB = "big-header-span-md";
            break;
        case "lg":
            styleClassL = "low-header-span";
            styleClassB = "big-header-span";
            break;

        default:
            break;
    }

    return (
        <>
            <span className={styleClassB}>УЗНИКИ БЕЛАРУСИ</span>
            <span className={styleClassL}>геноцид Белорусского народа</span>
        </>
    )
}