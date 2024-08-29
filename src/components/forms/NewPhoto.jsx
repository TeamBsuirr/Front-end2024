import { React, useState } from 'react';
import '../../assets/styles/forms/NewPhoto.css'

import { notification } from 'antd';
import userService from '../../api/services/userService';
import { useTranslation } from 'react-i18next';
import Spinner from '../other/Spinner';
import InputForm from '../inputs/InputForm';
import DateForm from '../inputs/DateForm';
import ButtonSubmit from '../buttons/ButtonSubmit';
import InputShortDescription from '../inputs/InputShortDescription';
import InputPhoto from '../inputs/InputPhoto';
import InputSelect from '../inputs/InputSelect';
import HeaderSection from '../other/HeaderSection';
import searchService from '../../api/services/searchService';


export default function NewPhoto({ objectOfPhoto}) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState(objectOfPhoto);
    const [loading, setLoading] = useState(false);

    const validateInput = () => {
        let isValid = true;
        console.log(formData);
        // Validate name, surname, and patronymic
        ['title', 'description'].forEach(field => {
            if (!formData[field] || formData[field].length < 1 || formData[field].length > 100) {
                isValid = false;

                notification.error({ message: t('errors.front-end.add-story.field') + " " + field + " " + t('errors.front-end.add-story.symbol-length') });
            }
            if (/["'<>]/.test(formData[field])) {
                isValid = false;
                notification.error({ message: t('errors.front-end.add-story.field') + " " + field + " " + t('errors.front-end.add-story.incorrect-symbols') });
            }
        });

        // Validate files
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff', 'image/svg+xml'];
        const disallowedTypes = ['application/x-javascript', 'application/x-php', 'application/x-msdos-program', 'application/x-shellscript', 'application/x-bat', 'application/x-msdos-program', 'application/x-vbscript', 'application/x-perl', 'application/x-python'];


        console.log(formData)
        const fileType = formData.image[0].type;
        if (disallowedTypes.includes(fileType)) {
            isValid = false;
            notification.error({ message: t('errors.front-end.add-story.type-file') + " " + fileType + " " + t('errors.front-end.add-story.incorrect-file-type') });
        }
        if (!allowedImageTypes.includes(fileType)) {
            isValid = false;
            notification.error({ message: t('errors.front-end.add-story.type-file') + " " + fileType + " " + t('errors.front-end.add-story.incorrect-file-type') });
        }
        if (formData.size > 5 * 1024 * 1024) { // 5 MB
            isValid = false;
            notification.error({ message: t('errors.front-end.add-story.incorrect-file-size') });
        }



        return isValid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleDescriptionChange = (e) => {
        setFormData({
            ...formData,
            description: e.target.value
        });
    };

    const handleFileChange = (e) => {
        console.log('File input changed:', e); // Check if this logs
        const file = e.target.files; // Convert FileList to array
        console.log('File selected:', file); // Log the selected files
        setFormData(prevState => ({
            ...prevState,
            image: file,
        }));
    };


    const handleAdminAdd = () => {
        if (validateInput()) {
            // Form valid, send data to server

            setLoading(true);

            searchService.postPhoto(formData)
                .then(response => {
                    // console.log(response);
                    setLoading(false);
                    notification.success({ message: t('errors.front-end.add-story.success') });

                })
                .catch(error => {
                    // console.error('Ошибка получения результатов:', error);
                    let errMsg = error.message ? error.message : error;
                    notification.error({
                        message: t('errors.front-end.add-story.error-receive'),
                        description: t('errors.front-end.add-story.error-receive-description') + ' ' + errMsg
                    });

                    setLoading(false);
                });
        }
    };

    return (
        <div className='section-new-photo'>
            {loading ? (<>
                <Spinner size="large" />
            </>) : (<></>)
            }

            <section className='section-form-new-photo'>

                <HeaderSection textFirst={t('ref.control-panel')} textSecond={t('add-photo.header')} isCenteredText={false} />

                <div className='container-form-new-photo'>
                    <div className='container-inputs-form-new-photo'>
                        <div className='container-inputs-form-inputs'>
                            <InputPhoto
                                placeholder={t("add-photo.placeholder.photo-load")}
                                onFileChange={handleFileChange}
                                multiple={false} 
                                value={formData.image.urlToFile}
                                />

                            {/* ДОПОЛНИТЕЛЬНАЯ ФУНКЦИОНАЛЬНОСТЬ ДЛЯ ПРИВЯЗКИ К МЕСТУ И УЗНИКУ  */}

                            {/* <InputSelect
                                name="places"
                                value={formData.places}
                                arrayOfSelects={["МЕсто 1", "Место 2"]}
                                placeholder={t("add-photo.placeholder.place")} onChange={handleSelectChange}
                            />

                            <div className='container-inputs-form-last-input'>

                                <InputSelect
                                    placeholder={t("add-photo.placeholder.people")}
                                    value={formData.humans}
                                    name="humans"
                                    arrayOfSelects={["Вася", "Коля"]}
                                    onChange={handleSelectChange}
                                />

                                <div className="container-image-input-attachment">
                                    <label htmlFor="image" className="input-file"></label>
                                    <input type="file" name="image" id="image" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.svg" multiple />
                                </div>
                            </div>


                            <div className='container-small-message'>
                                <span>{t('add-photo.tip-text.not-add-uznik')}</span>
                                <span>{t('add-photo.tip-text.add-uznik-p1')}<a href="/story">{t('add-photo.tip-text.add-uznik-p2')}</a>{t('add-photo.tip-text.add-uznik-p3')}</span>
                            </div> */}


                        </div>

                    </div>
                </div>
                <div className='container-desctription-inputs-new-photo'>
                    <div className='container-section-photo-description'>
                        <div className='container-span-for-inputs-new-photo'>
                            <span>
                                {t("add-photo.placeholder.tip")}
                            </span>
                        </div>
                        <div className='container-inputs-new-photo'>
                            <InputForm placeholder={t("add-camp.placeholder.camp-title")} name="title" id="title" type="text" onChange={handleInputChange} value={formData.title} />
                            <InputShortDescription onDescriptionChange={handleDescriptionChange}  shortValue={formData.description} />
                        </div>
                    </div>
                </div>
            </section>


            <div className='container-add-form-button-new-photo'>
                <ButtonSubmit
                    isColorsInverse={true}
                    themeColor="yellow"
                    href="none"
                    spanText={t("admin-panel.btn.add")}
                    onClick={handleAdminAdd}
                    size />
            </div>
        </div >
    )
}