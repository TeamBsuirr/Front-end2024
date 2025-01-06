import React from "react";
import "../../assets/styles/layout/NotFound.css";
import PageTemplate from "../other/PageTemplate";
import { useTranslation } from "react-i18next";

export default function NotFound({message=null}) {
    const { t } = useTranslation();

    return <PageTemplate content={message ? message : t("errors.front-end.404-error")} />;
}
