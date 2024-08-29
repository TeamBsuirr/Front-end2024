

import { React } from 'react';
import PageTemplate from '../../components/other/PageTemplate';
import { useTranslation } from 'react-i18next';
import Spinner from '../../components/other/Spinner';
import HeaderSection from '../../components/other/HeaderSection';
import ButtomAdmin from '../../components/buttons/ButtonAdmin';
import PlacePreview from "../../assets/images/PlacePreview.jpg"
import HumanPreview from "../../assets/images/HumanPreview.jpg"
import PhotoPreview from "../../assets/images/PhotoPreview.jpg"
import useLocalizedNavigate from '../../utils/useLocalizedNavigate';

export default function AdminDashboardPage() {
    const navigate = useLocalizedNavigate();
    const { t } = useTranslation();
    const linksArray = [
        {
            "header": t('admin-panel.control-panel.card.camp.header'),
            "description": t('admin-panel.control-panel.card.camp.additional-text'),
            "href": "/crud/place",
            "img": PlacePreview,
        },
        {
            "header": t('admin-panel.control-panel.card.prisoners.header'),
            "description": t('admin-panel.control-panel.card.prisoners.additional-text'),
            "href": "/crud/human",
            "img": HumanPreview,
        },
        {
            "header": t('admin-panel.control-panel.card.photo-archive.header'),
            "description": t('admin-panel.control-panel.card.photo-archive.additional-text'),
            "href": "/crud/photo",
            "img": PhotoPreview,
        },
    ]
    return (
        <div className='section-search-result'>
            <section className='section-form-search-result'>

                <HeaderSection textFirst={t('admin-panel.control-panel.header')} isCenteredText={false} />


                <div className='container-description-map-admin'>
                    <span>{t('admin-panel.control-panel.additional-text')}</span>
                    <div className='admin-btn-container'>
                        <ButtomAdmin isColorsInverse={false} themeColor="black" href="none" size="xs" />
                    </div>
                </div>


            </section>

            <section className='section-register-search-result'>
                {linksArray.map((obj) => (
                    <div className='result-container-search-result' key={obj.id}>
                        <img src={obj.img} alt={"image #" + 1} onClick={() => { navigate(obj.href); }} />
                        <div className='result-container-search-result-description'>
                            <h3>{obj.header}</h3>
                            <span>{obj.description}</span>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}