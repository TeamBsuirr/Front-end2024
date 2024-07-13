
import { useState } from 'react';
import '../../assets/styles/layout/HeaderLayout.css'
import SiteMainHeaderSpan from '../other/SiteMainHeaderSpan';

export default function HeaderLayout() {

    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('russian');
    const [isHovered, setIsHovered] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        setMenuVisible(false); // Закрыть меню после выбора
    };

    return (

        <header className='header-layout'>
            <div className="header-container">
                <div className="links">
                    <a href="/about" className="link">
                        О проекте
                    </a>
                    <a href="/contacts" className="link">
                        Контакты
                    </a>
                </div>
                <div className='site-main-header-header-container'>
                    <a href="/" style={{textDecoration:"none",}}>
                        <div>
                            <SiteMainHeaderSpan size="md" />
                        </div>

                    </a>

                </div>
                <div className="globus-button"
                    onClick={toggleMenu}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isHovered ? (

                        <svg className={isHovered ? 'globus-hovered' : 'globus'} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_124_891)">
                                <g clip-path="url(#clip1_124_891)">
                                    <path d="M19.6327 31.2548C26.1356 31.2548 31.4072 25.9831 31.4072 19.4802C31.4072 12.9773 26.1356 7.70569 19.6327 7.70569C13.1298 7.70569 7.85815 12.9773 7.85815 19.4802C7.85815 25.9831 13.1298 31.2548 19.6327 31.2548Z" fill="#544C41" stroke="#E9C79A" stroke-width="1.5" stroke-miterlimit="22.9256" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8755 11.8947C15.1427 11.5624 15.3121 11.3538 15.4621 11.1519C15.612 10.9498 15.7422 10.7543 15.9639 10.5979C16.1854 10.4414 16.4981 10.3241 16.824 10.3241C17.1498 10.3241 17.4888 10.4414 17.7494 10.6566C18.0101 10.8716 18.1925 11.1844 18.2838 11.3408C18.3749 11.4972 18.3749 11.4972 18.4793 11.4061C18.5835 11.3148 18.792 11.1322 18.8376 10.8259C18.8833 10.5197 18.766 10.0897 18.8247 9.8812C18.8833 9.6726 19.1179 9.68554 19.3525 9.87452C19.5871 10.0635 19.8216 10.4285 20.115 10.6631C20.4082 10.8976 20.7601 11.002 20.9491 11.1519C21.1381 11.3017 21.1642 11.4971 20.9231 11.6535C20.6819 11.8099 20.1737 11.9272 19.7761 12.1619C19.3785 12.3965 19.0919 12.7484 18.9355 12.931C18.779 13.1134 18.7529 13.1264 18.9419 13.1329C19.1308 13.1394 19.535 13.1394 19.8413 13.335C20.1475 13.5305 20.356 13.9214 20.6428 14.2082C20.9295 14.4948 21.2945 14.6773 21.4769 14.7686C21.6593 14.8597 21.6593 14.8597 21.7701 14.6513C21.8809 14.4427 22.1026 14.0256 22.1808 13.6216C22.259 13.2175 22.1937 12.8266 22.2003 12.5529C22.2068 12.2792 22.285 12.1228 22.5522 12.2335C22.8194 12.3443 23.2755 12.7224 23.6991 12.9114C24.1227 13.1003 24.5136 13.1003 24.9503 13.3284C25.3868 13.5565 25.8692 14.0127 26.0972 14.3255C26.3253 14.6382 26.2991 14.8077 26.2862 14.8924C26.2731 14.977 26.2731 14.977 26.0647 14.9967C25.8561 15.0161 25.439 15.0552 25.1002 15.2769C24.7613 15.4984 24.5007 15.9024 24.2009 16.2609C23.9012 16.6194 23.5622 16.9321 23.2364 17.1601C22.9105 17.3882 22.5978 17.5317 22.4219 17.8836C22.2459 18.2354 22.2068 18.7959 22.1612 19.2781C22.1155 19.7603 22.0635 20.1644 21.9787 20.3794C21.894 20.5944 21.7767 20.6206 21.5551 20.4967C21.3336 20.3729 21.0077 20.0992 20.6624 19.8711C20.317 19.643 19.952 19.4606 19.6328 19.4802C19.3134 19.4997 19.0397 19.7212 18.8573 20.0275C18.6747 20.3338 18.5835 20.7248 18.5575 21.0833C18.5313 21.4416 18.5704 21.7675 18.6878 21.9696C18.8051 22.1715 19.0006 22.2497 19.1701 22.2759C19.3394 22.3019 19.4829 22.2757 19.6002 22.1455C19.7174 22.0151 19.8087 21.7805 19.9195 21.7414C20.0302 21.7023 20.1605 21.8587 20.2257 22.0673C20.2909 22.2757 20.2909 22.5365 20.3822 22.6995C20.4733 22.8623 20.6559 22.9274 20.8383 22.9079C21.0208 22.8883 21.2032 22.7841 21.2879 22.921C21.3725 23.0578 21.3596 23.4357 21.2879 23.8202C21.2163 24.2047 21.0859 24.5956 20.9622 24.7846C20.8383 24.9736 20.721 24.9606 20.6102 24.7913C20.4995 24.6218 20.3951 24.2959 20.1997 23.9832C20.0042 23.6704 19.7174 23.3705 19.4242 23.1555C19.131 22.9405 18.8311 22.8101 18.4857 22.7841C18.1403 22.7581 17.7494 22.8361 17.4757 22.8036C17.202 22.771 17.0456 22.6277 16.9479 22.3475C16.85 22.0673 16.8109 21.6502 16.5308 21.194C16.2505 20.7379 15.7291 20.2425 15.3186 19.7798C14.9081 19.3171 14.6083 18.8871 14.263 18.6656C13.9176 18.4439 13.5267 18.4309 13.4224 18.1963C13.3181 17.9617 13.5005 17.5055 13.6569 16.9777C13.8133 16.4499 13.9436 15.8502 13.8524 15.5179C13.7611 15.1856 13.4485 15.1204 13.1944 14.9967C12.9401 14.8728 12.7446 14.6904 12.7317 14.4297C12.7186 14.1691 12.8879 13.8301 13.1096 13.602C13.3312 13.3739 13.6047 13.2568 13.9241 12.9701C14.2433 12.6833 14.6083 12.227 14.8755 11.8947Z" fill="#E9C79A" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.2326 24.7C22.1935 24.8824 22.337 25.13 22.3175 25.3908C22.2979 25.6514 22.1153 25.925 21.8808 26.0685C21.6462 26.2118 21.3594 26.2247 21.1704 26.3877C20.9814 26.5507 20.8903 26.8635 20.8381 27.248C20.7859 27.6325 20.773 28.0886 20.9163 28.382C21.0596 28.6752 21.3594 28.8054 21.7373 28.7403C22.1153 28.6752 22.5714 28.4144 22.8386 28.1734C23.1058 27.9322 23.184 27.7107 23.3666 27.5348C23.549 27.3587 23.8357 27.2285 24.1225 27.0199C24.4092 26.8113 24.696 26.5246 25.087 26.4139C25.4779 26.3029 25.9732 26.3682 26.3185 26.4008C26.6639 26.4333 26.8595 26.4333 26.8725 26.1792C26.8855 25.925 26.7161 25.4168 26.4033 25.0585C26.0905 24.7 25.6343 24.4914 25.2303 24.4263C24.8262 24.3611 24.4744 24.4392 24.1812 24.3675C23.8879 24.2959 23.6532 24.0743 23.4186 24.0352C23.184 23.9961 22.9495 24.1396 22.7215 24.27C22.4934 24.4003 22.2717 24.5174 22.2326 24.7Z" fill="#E9C79A" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M28.4514 17.3267C28.3774 17.6125 28.417 18.0855 28.5205 18.6376C28.624 19.1896 28.7914 19.8205 29.0281 20.3528C29.2646 20.885 29.5703 21.3188 29.7231 21.6392C29.8759 21.9594 29.8759 22.1664 29.94 22.1468C30.0039 22.127 30.1322 21.8806 30.2455 21.4765C30.3588 21.0724 30.4573 20.5104 30.4031 20.131C30.3489 19.7514 30.1419 19.5543 30.1025 19.17C30.0631 18.7855 30.1912 18.2138 30.206 17.6963C30.2208 17.1788 30.1223 16.7155 29.9301 16.3705C29.7378 16.0254 29.452 15.7988 29.2499 15.7347C29.0477 15.6706 28.9295 15.7691 28.8852 15.9811C28.8407 16.193 28.8704 16.5182 28.7916 16.7302C28.7127 16.9421 28.5253 17.0408 28.4514 17.3267Z" fill="#E9C79A" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M28.2157 13.6343C28.4214 13.7971 28.6444 13.9772 28.7859 14.1959C28.9273 14.4144 28.9872 14.6715 29.0044 14.8387C29.0215 15.0059 28.9959 15.083 28.893 15.1002C28.7901 15.1173 28.6101 15.0745 28.4687 14.9117C28.3272 14.7487 28.2243 14.4658 28.0915 14.1572C27.9586 13.8486 27.7958 13.5142 27.8086 13.42C27.8214 13.3257 28.01 13.4714 28.2157 13.6343Z" fill="#E9C79A" />
                                </g>
                                <circle cx="20" cy="20" r="19.5" stroke="#E9C79A" />
                            </g>
                            <defs>
                                <clipPath id="clip0_124_891">
                                    <rect width="40" height="40" fill="white" />
                                </clipPath>
                                <clipPath id="clip1_124_891">
                                    <rect width="25" height="25" fill="white" transform="translate(7 7)" />
                                </clipPath>
                            </defs>
                        </svg>

                    ) :

                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="lang">
                                <g id="lang1 1" clip-path="url(#clip0_81_139)">
                                    <g id="&#208;&#161;&#208;&#187;&#208;&#190;&#208;&#185;_x0020_1">
                                        <g id="_2105473490608">
                                            <path id="Vector" d="M19.6327 32.2548C26.1356 32.2548 31.4072 26.9831 31.4072 20.4802C31.4072 13.9773 26.1356 8.70569 19.6327 8.70569C13.1298 8.70569 7.85815 13.9773 7.85815 20.4802C7.85815 26.9831 13.1298 32.2548 19.6327 32.2548Z" fill="#544C41" stroke="#B4AEA7" stroke-width="1.5" stroke-miterlimit="22.9256" />
                                            <path id="Vector_2" fill-rule="evenodd" clip-rule="evenodd" d="M14.8755 12.8947C15.1427 12.5624 15.3121 12.3538 15.4621 12.1519C15.612 11.9498 15.7422 11.7543 15.9639 11.5979C16.1854 11.4414 16.4981 11.3241 16.824 11.3241C17.1498 11.3241 17.4888 11.4414 17.7494 11.6566C18.0101 11.8716 18.1925 12.1844 18.2838 12.3408C18.3749 12.4972 18.3749 12.4972 18.4793 12.4061C18.5835 12.3148 18.792 12.1322 18.8376 11.8259C18.8833 11.5197 18.766 11.0897 18.8247 10.8812C18.8833 10.6726 19.1179 10.6855 19.3525 10.8745C19.5871 11.0635 19.8216 11.4285 20.115 11.6631C20.4082 11.8976 20.7601 12.002 20.9491 12.1519C21.1381 12.3017 21.1642 12.4971 20.9231 12.6535C20.6819 12.8099 20.1737 12.9272 19.7761 13.1619C19.3785 13.3965 19.0919 13.7484 18.9355 13.931C18.779 14.1134 18.7529 14.1264 18.9419 14.1329C19.1308 14.1394 19.535 14.1394 19.8413 14.335C20.1475 14.5305 20.356 14.9214 20.6428 15.2082C20.9295 15.4948 21.2945 15.6773 21.4769 15.7686C21.6593 15.8597 21.6593 15.8597 21.7701 15.6513C21.8809 15.4427 22.1026 15.0256 22.1808 14.6216C22.259 14.2175 22.1937 13.8266 22.2003 13.5529C22.2068 13.2792 22.285 13.1228 22.5522 13.2335C22.8194 13.3443 23.2755 13.7224 23.6991 13.9114C24.1227 14.1003 24.5136 14.1003 24.9503 14.3284C25.3868 14.5565 25.8692 15.0127 26.0972 15.3255C26.3253 15.6382 26.2991 15.8077 26.2862 15.8924C26.2731 15.977 26.2731 15.977 26.0647 15.9967C25.8561 16.0161 25.439 16.0552 25.1002 16.2769C24.7613 16.4984 24.5007 16.9024 24.2009 17.2609C23.9012 17.6194 23.5622 17.9321 23.2364 18.1601C22.9105 18.3882 22.5978 18.5317 22.4219 18.8836C22.2459 19.2354 22.2068 19.7959 22.1612 20.2781C22.1155 20.7603 22.0635 21.1644 21.9787 21.3794C21.894 21.5944 21.7767 21.6206 21.5551 21.4967C21.3336 21.3729 21.0077 21.0992 20.6624 20.8711C20.317 20.643 19.952 20.4606 19.6328 20.4802C19.3134 20.4997 19.0397 20.7212 18.8573 21.0275C18.6747 21.3338 18.5835 21.7248 18.5575 22.0833C18.5313 22.4416 18.5704 22.7675 18.6878 22.9696C18.8051 23.1715 19.0006 23.2497 19.1701 23.2759C19.3394 23.3019 19.4829 23.2757 19.6002 23.1455C19.7174 23.0151 19.8087 22.7805 19.9195 22.7414C20.0302 22.7023 20.1605 22.8587 20.2257 23.0673C20.2909 23.2757 20.2909 23.5365 20.3822 23.6995C20.4733 23.8623 20.6559 23.9274 20.8383 23.9079C21.0208 23.8883 21.2032 23.7841 21.2879 23.921C21.3725 24.0578 21.3596 24.4357 21.2879 24.8202C21.2163 25.2047 21.0859 25.5956 20.9622 25.7846C20.8383 25.9736 20.721 25.9606 20.6102 25.7913C20.4995 25.6218 20.3951 25.2959 20.1997 24.9832C20.0042 24.6704 19.7174 24.3705 19.4242 24.1555C19.131 23.9405 18.8311 23.8101 18.4857 23.7841C18.1403 23.7581 17.7494 23.8361 17.4757 23.8036C17.202 23.771 17.0456 23.6277 16.9479 23.3475C16.85 23.0673 16.8109 22.6502 16.5308 22.194C16.2505 21.7379 15.7291 21.2425 15.3186 20.7798C14.9081 20.3171 14.6083 19.8871 14.263 19.6656C13.9176 19.4439 13.5267 19.4309 13.4224 19.1963C13.3181 18.9617 13.5005 18.5055 13.6569 17.9777C13.8133 17.4499 13.9436 16.8502 13.8524 16.5179C13.7611 16.1856 13.4485 16.1204 13.1944 15.9967C12.9401 15.8728 12.7446 15.6904 12.7317 15.4297C12.7186 15.1691 12.8879 14.8301 13.1096 14.602C13.3312 14.3739 13.6047 14.2568 13.9241 13.9701C14.2433 13.6833 14.6083 13.227 14.8755 12.8947Z" fill="#B4AEA7" />
                                            <path id="Vector_3" fill-rule="evenodd" clip-rule="evenodd" d="M22.2326 25.7C22.1935 25.8824 22.337 26.13 22.3175 26.3908C22.2979 26.6514 22.1153 26.925 21.8808 27.0685C21.6462 27.2118 21.3594 27.2247 21.1704 27.3877C20.9814 27.5507 20.8903 27.8635 20.8381 28.248C20.7859 28.6325 20.773 29.0886 20.9163 29.382C21.0596 29.6752 21.3594 29.8054 21.7373 29.7403C22.1153 29.6752 22.5714 29.4144 22.8386 29.1734C23.1058 28.9322 23.184 28.7107 23.3666 28.5348C23.549 28.3587 23.8357 28.2285 24.1225 28.0199C24.4092 27.8113 24.696 27.5246 25.087 27.4139C25.4779 27.3029 25.9732 27.3682 26.3185 27.4008C26.6639 27.4333 26.8595 27.4333 26.8725 27.1792C26.8855 26.925 26.7161 26.4168 26.4033 26.0585C26.0905 25.7 25.6343 25.4914 25.2303 25.4263C24.8262 25.3611 24.4744 25.4392 24.1812 25.3675C23.8879 25.2959 23.6532 25.0743 23.4186 25.0352C23.184 24.9961 22.9495 25.1396 22.7215 25.27C22.4934 25.4003 22.2717 25.5174 22.2326 25.7Z" fill="#B4AEA7" />
                                            <path id="Vector_4" fill-rule="evenodd" clip-rule="evenodd" d="M28.4514 18.3267C28.3774 18.6125 28.417 19.0855 28.5205 19.6376C28.624 20.1896 28.7914 20.8205 29.0281 21.3528C29.2646 21.885 29.5703 22.3188 29.7231 22.6392C29.8759 22.9594 29.8759 23.1664 29.94 23.1468C30.0039 23.127 30.1322 22.8806 30.2455 22.4765C30.3588 22.0724 30.4573 21.5104 30.4031 21.131C30.3489 20.7514 30.1419 20.5543 30.1025 20.17C30.0631 19.7855 30.1912 19.2138 30.206 18.6963C30.2208 18.1788 30.1223 17.7155 29.9301 17.3705C29.7378 17.0254 29.452 16.7988 29.2499 16.7347C29.0477 16.6706 28.9295 16.7691 28.8852 16.9811C28.8407 17.193 28.8704 17.5182 28.7916 17.7302C28.7127 17.9421 28.5253 18.0408 28.4514 18.3267Z" fill="#B4AEA7" />
                                            <path id="Vector_5" fill-rule="evenodd" clip-rule="evenodd" d="M28.2157 14.6343C28.4214 14.7971 28.6444 14.9772 28.7859 15.1959C28.9273 15.4144 28.9872 15.6715 29.0044 15.8387C29.0215 16.0059 28.9959 16.083 28.893 16.1002C28.7901 16.1173 28.6101 16.0745 28.4687 15.9117C28.3272 15.7487 28.2243 15.4658 28.0915 15.1572C27.9586 14.8486 27.7958 14.5142 27.8086 14.42C27.8214 14.3257 28.01 14.4714 28.2157 14.6343Z" fill="#B4AEA7" />
                                        </g>
                                    </g>
                                </g>
                                <circle id="Ellipse 3" cx="20" cy="20" r="19.5" stroke="#B4AEA7" />
                            </g>
                            <defs>
                                <clipPath id="clip0_81_139">
                                    <rect width="25" height="25" fill="white" transform="translate(7 8)" />
                                </clipPath>
                            </defs>
                        </svg>
                    }



                </div>
                {menuVisible && (
                    <div className="language-menu">
                        <ul>
                            <li
                                className={selectedLanguage === 'russian' ? 'active' : ''}
                                onClick={() => handleLanguageSelect('russian')}
                            >
                                Русский
                            </li>
                            <li
                                className={selectedLanguage === 'belorussian' ? 'active' : ''}
                                onClick={() => handleLanguageSelect('belorussian')}
                            >
                                Белорусский
                            </li>
                            <li
                                className={selectedLanguage === 'deutsch' ? 'active' : ''}
                                onClick={() => handleLanguageSelect('deutsch')}
                            >
                                Deutsch
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    )
}