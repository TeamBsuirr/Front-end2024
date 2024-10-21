import { React, useEffect, useState } from 'react';
import '../../assets/styles/forms/PhotoArchive.css'
import Image4 from '../../assets/images/Image4.jpeg'
import { useTranslation } from 'react-i18next';
import ButtomAdmin from '../buttons/ButtonAdmin';
import HeaderSection from '../other/HeaderSection';
import ButtonCrud from '../buttons/ButtonCrud';
import searchService from '../../api/services/searchService';
import { notification } from 'antd';
import useLocalizedNavigate from '../../utils/useLocalizedNavigate';

export default function PhotoArchive({ arrayOfPhotoObjects, isAdmin = false }) {
    // const navigate = useLocalizedNavigate();
    const { t } = useTranslation();
    const [selectedObject, setSelectedObject] = useState(null);
    const [photoArray, setPhotoArray] = useState(arrayOfPhotoObjects); // Храним массив фотографий

    useEffect(() => {
       console.log("array of photos has changed")
      }, [photoArray]);

    function openImage(index) {
        if (photoArray[index]) {
            setSelectedObject(photoArray[index]);
        }
    }

    function closeModal() {
        setSelectedObject(null);
    }


    const handleDelete = async (id) => {
        try {
            
            const response = await searchService.deletePhotoById(id)

            // Обновляем массив, удаляя элемент с соответствующим id
            const updatedPhotoArray = photoArray.filter(photo => photo.id !== id);
            setPhotoArray(updatedPhotoArray); // Обновляем состояние массива фотографий


            // console.log('Admin logged in successfully');
            notification.success({ message: t('success deleted photo!') });

            //setTimeout(() => navigate("/archive/photos"), 1000)
            // Здесь можно выполнить дополнительные действия, например, перенаправление на защищенную страницу
        } catch (err) {
            // Check if the error object contains a specific error response message
            const errorMessage = err.response?.data?.message || t('delete error');

            // Display an error notification with a specific or fallback message
            notification.error({
                message: errorMessage
            });

            // Log the error details for debugging
            console.error('Error occurred during deletion:', err);
        }

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
                                <ButtomAdmin isColorsInverse={false} themeColor="black" href="/crud/photo" spanText={t('admin-panel.btn.add-photo-archive')} size="s" />
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

                {photoArray.map((obj, index) => (
                    <div className='result-container-archive' key={index}>
                       
                        <img src={obj.image.urlToFile} alt={"image #" + index} onClick={() => { openImage(index); }} />
                     
                        <div className='result-container-archive-description'>
                            <h3>{obj.title}</h3>
                            {isAdmin ?
                                    <>
                                       

                                            <div className='admin-btn-container-archive '>
                                                <ButtonCrud href={`/crud/photo/${obj?.id}`} svgType="edit" />
                                                <ButtonCrud href="none" onClick={()=>handleDelete(obj?.id)} svgType="delete" />
                                            </div>
                                       
                                    </>
                                    :
                                    <></>
                            }
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