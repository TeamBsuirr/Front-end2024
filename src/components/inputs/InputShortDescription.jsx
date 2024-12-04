import { React } from "react";
import "../../assets/styles/inputs/InputDescription.css";
import { useTranslation } from "react-i18next";

export default function InputShortDescription({
    onDescriptionChange,
    shortValue,
}) {
    const { t } = useTranslation();

    return (
        <div className="container-input-span">
            <span>
                {t("add-camp.placeholder.short-description")}
            </span>
            <div className="story-short">
                <textarea
                    value={shortValue}
                    name="story"
                    id="story"
                    placeholder={t("add-camp.placeholder.short-description")}
                    onChange={onDescriptionChange}
                ></textarea>
            </div>
        </div>
    );
}
