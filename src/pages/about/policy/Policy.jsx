import { React } from "react";
import PageTemplate from "../../../components/other/PageTemplate";
import { useTranslation } from "react-i18next";

export default function Policy() {
    const { t } = useTranslation();

    return (
        <PageTemplate
            content={t("privacy-policy")}
            contentSection={t("main.btn-description.legal-analysis")}
        />
    );
}
