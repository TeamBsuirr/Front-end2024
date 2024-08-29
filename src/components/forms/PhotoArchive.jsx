import { React, useState } from 'react';
import '../../assets/styles/forms/PhotoArchive.css'
import Image4 from '../../assets/images/Image4.jpeg'
import { useTranslation } from 'react-i18next';
import ButtomAdmin from '../buttons/ButtonAdmin';
import HeaderSection from '../other/HeaderSection';

export default function PhotoArchive({ arrayOfPhotoObjects, isAdmin = false }) {

    const { t } = useTranslation();
    const [selectedObject, setSelectedObject] = useState(null);


    function openImage(index) {
        if (arrayOfPhotoObjects[index]) {
            setSelectedObject(arrayOfPhotoObjects[index]);
        }
    }

    function closeModal() {
        setSelectedObject(null);
    }


    return (
        <div className='section-search-result'>
            <section className='section-form-search-result'>
                <HeaderSection
                    textFirst={t('photo-archive.header')}
                />
                {isAdmin ?
                    <>
                        <div className='container-description-map-admin'>
                            <span>{t('photo-archive.additional-text')}</span>
                            <div className='admin-btn-container'>
                                <ButtomAdmin isColorsInverse={false} themeColor="black" href="/" spanText={t('admin-panel.btn.add-photo-archive')} size="s" />
                            </div>
                        </div>
                    </>
                    :
                    <div className='container-description-map'>
                        <span>{t('photo-archive.additional-text')}</span>
                    </div>
                }

            </section>
            {/* ADD TOP BORDER TO THIS */}
            <section className='section-register-search-result'>

                {arrayOfPhotoObjects.map((obj, index) => (
                    <div className='result-container-archive' key={index}>
                        <img src={obj.image.urlToFile} alt={"image #" + index} onClick={() => { openImage(index); }} />
                        <div className='result-container-archive-description'>
                            <h3>{obj.title}</h3>
                        </div>
                    </div>
                ))}

                {selectedObject && (
                    <div className='modal' onClick={closeModal}>
                        <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                            <img src={selectedObject.image.urlToFile} alt="Selected" />
                            <div className='modal-description'>
                                <h3>{selectedObject.title}</h3>
                                <span>{selectedObject.description}</span>

                            </div>
                        </div>
                    </div>
                )}

            </section>

        </div>

    )
}