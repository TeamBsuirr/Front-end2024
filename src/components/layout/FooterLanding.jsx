
import React from 'react';
import '../../assets/styles/layout/FooterLanding.css'
import PartnersList from '../other/PartnersList';
import ButtonSubmit from '../buttons/ButtonSubmit';
import SiteMainHeaderSpan from '../other/SiteMainHeaderSpan';

export default function FooterLanding() {

    return (
        <footer className='footer-container'>
            {/* UPPER PART */}
            <div className='upper-footer-container'>
                <div>
                    <SiteMainHeaderSpan size="lg" />

                    <a href="/about" className="link">О проекте</a>
                    <a href="/contacts" className="link">Контакты</a>
                </div>

                <div>
                    <div className="button-footer-container">
                        <ButtonSubmit isColorsInverse={false} themeColor="yellow" href="/story" spanText="ХОЧУ ДОБАВИТЬ ИСТОРИЮ" size="md" />
                    </div>
                </div>

                <div>
                    <PartnersList />
                </div>
            </div>

            <div className='bottom-footer-container'>
                {/* BOTTOM PART */}
                <span className="footer-project-name">Ⓒ Узники Беларуси, 2024</span>
                <span className="footer-policy-info">Политика конфиденциальности</span>
            </div>
        </footer>
    )
}