import { React } from "react";
import PageTemplate from "../../../components/other/PageTemplate";
import { useTranslation } from "react-i18next";

export default function Analysis() {
    const { t } = useTranslation();

    return (
        <PageTemplate
            content={t("main.btn.legal-analysis")}
            contentSection={t("main.btn-description.legal-analysis")}
        />
    );
}
