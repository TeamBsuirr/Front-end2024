

import { React } from 'react';
import '../../assets/styles/forms/NewHistory.css'
import PageTemplate from '../../components/other/PageTemplate';
import { useTranslation } from 'react-i18next';


export default function Contact() {
    const { t } = useTranslation();

    return (

        <PageTemplate content={t('ref.contacts')} />

    )
}