
import React from 'react';
import '../../assets/styles/layout/FooterLayout.css'
import PartnersList from '../other/PartnersList';
import ButtonSubmit from '../buttons/ButtonSubmit';
import SiteMainHeaderSpan from '../other/SiteMainHeaderSpan';
import { useTranslation } from 'react-i18next';

export default function FooterLayout() {
    const { t } = useTranslation();

    return (
        <footer className='footer-container-layout'>
            {/* UPPER PART */}
            <div className='upper-footer-container-layout'>
                <div>
                    <SiteMainHeaderSpan size="lg" />

                    <a href="/about" className="link">{t('ref.about-project')}</a>
                    <a href="/contacts" className="link">{t('ref.contacts')}</a>
                </div>

                <div>
                    <div className="button-footer-container">
                        <ButtonSubmit isColorsInverse={false} themeColor="yellow" href="/story" spanText={t("add-story.btn.add-story")} size="md" />
                    </div>
                </div>

                <div>
                    <PartnersList />
                </div>
            </div>

            <div className='bottom-footer-container-layout'>
                {/* BOTTOM PART */}
                <span className="footer-project-name">{t('copyright')}</span>
                <a href="/about/policy" className="link">{t('privacy-policy')}</a>
            </div>
        </footer>
    )
}