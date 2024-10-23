import React from "react";
import "../../assets/styles/layout/NotFound.css";
import PageTemplate from "../other/PageTemplate";
import { useTranslation } from "react-i18next";

export default function NotFound() {
    const { t } = useTranslation();

    return <PageTemplate content={t("errors.front-end.404-error")} />;
}
