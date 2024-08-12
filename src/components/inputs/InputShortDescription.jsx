import { React } from 'react';
import '../../assets/styles/inputs/InputDescription.css'
import { useTranslation } from 'react-i18next';


export default function InputShortDescription({ onDescriptionChange }) {
    const { t } = useTranslation();

    return (
        <div class="story-short">
            <textarea name="story" id="story" placeholder={t("add-camp.placeholder.short-description")} onChange={onDescriptionChange}></textarea>
        </div>
    )
}