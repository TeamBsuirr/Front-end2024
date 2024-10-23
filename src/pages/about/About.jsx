import { React } from "react";
import PageTemplate from "../../components/other/PageTemplate";
import { useTranslation } from "react-i18next";

export default function About() {
    const { t } = useTranslation();

    return (
        <PageTemplate
            content={t("ref.about-project")}
            contentSection={t("about.content")}
        />
    );
}
