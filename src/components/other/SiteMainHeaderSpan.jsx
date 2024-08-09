import React from 'react';
import '../../assets/styles/other/SiteMainHeaderSpan.css'
import { useTranslation } from 'react-i18next';


export default function SiteMainHeaderSpan({ size }) {
    const { t } = useTranslation();

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
            <span className={styleClassB}>{t('logo.prisoners')}</span>
            <span className={styleClassL}>{t('logo.additional-text')}</span>
        </>
    )
}