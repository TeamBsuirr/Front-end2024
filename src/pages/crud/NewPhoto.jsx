import { React, useState } from 'react';
import '../../assets/styles/forms/NewPhoto.css'

import { notification } from 'antd';
import userService from '../../api/services/userService';
import { useTranslation } from 'react-i18next';
import Spinner from '../../components/other/Spinner';
import InputForm from '../../components/inputs/InputForm';
import DateForm from '../../components/inputs/DateForm';
import InputDescription from '../../components/inputs/InputDescription';
import ButtonSubmit from '../../components/buttons/ButtonSubmit';
import InputShortDescription from '../../components/inputs/InputShortDescription';
import InputPhoto from '../../components/inputs/InputPhoto';
import InputSelect from '../../components/inputs/InputSelect';


export default function NewPhoto({ isAdmin = false }) {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        "name": "",
        "surname": "",
        "patronymic": "",
        "dateOfBirth": "",
        "placeOfBirth": "",
        "placeOfDetention": "",
        "dateFrom": "",
        "dateTo": "",
        "fio": "",
        "phoneNumber": "",
        "email": "",
        "history": "",
        "files": []
    });
    const [loading, setLoading] = useState(false);

    const validateInput = () => {
        let isValid = true;
        console.log(formData);
        // Validate name, surname, and patronymic
        ['name', 'surname', 'patronymic'].forEach(field => {
            if (!formData[field] || formData[field].length < 1 || formData[field].length > 100) {
                isValid = false;

                notification.error({ message: t('errors.front-end.add-story.field') + " " + field + " " + t('errors.front-end.add-story.symbol-length') });
            }
            if (/["'<>]/.test(formData[field])) {
                isValid = false;
                notification.error({ message: t('errors.front-end.add-story.field') + " " + field + " " + t('errors.front-end.add-story.incorrect-symbols') });
            }
        });

        // Validate date of birth, start date and end date
        const today = new Date().toISOString().split('T')[0];
        if (!formData.dateOfBirth || formData.dateOfBirth >= today) {
            isValid = false;
            notification.error({ message: t('errors.front-end.add-story.incorrect-dof') });
        }
        if (formData.dateFrom >= formData.dateTo) {
            isValid = false;
            notification.error({ message: t('errors.front-end.add-story.incorrect-dot') });
        }

        // Validate place of birth and place of stay
        ['placeOfBirth', 'placeOfDetention'].forEach(field => {
            if (!formData[field] || formData[field].length < 1 || formData[field].length > 200) {
                isValid = false;
                notification.error({ message: t('errors.front-end.add-story.field') + " " + field + " " + t('errors.front-end.add-story.symbol-length-place') });
            }
            if (/["'<>]/.test(formData[field])) {
                isValid = false;
                notification.error({ message: t('errors.front-end.add-story.field') + " " + field + " " + t('errors.front-end.add-story.incorrect-symbols') });
            }
        });

        // Validate history
        if (!formData.history || formData.history.length < 1 || formData.history.length > 1000) {
            isValid = false;
            notification.error({ message: t('errors.front-end.add-story.incorrect-length-story') });
        }
        if (/["'<>]/.test(formData.history)) {
            isValid = false;
            notification.error({ message: t('errors.front-end.add-story.incorrect-symbols-story') });
        }

        // Validate phone number
        const phoneRegex = /^\+375 \(\d{2}\) \d{3} - \d{2} - \d{2}$/;
        if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
            isValid = false;
            notification.error({ message: t('errors.front-end.add-story.incorrect-phone') });
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            isValid = false;
            notification.error({ message: t('errors.front-end.add-story.incorrect-email') });
        }

        // Validate files
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff', 'image/svg+xml'];
        const allowedVideoTypes = ['video/mp4', 'video/x-msvideo', 'video/quicktime', 'video/x-matroska', 'video/x-flv', 'video/x-ms-wmv', 'video/webm'];
        const allowedDocumentTypes = [
            'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'text/plain', 'text/csv', 'application/zip', 'application/x-rar-compressed'
        ];
        const disallowedTypes = ['application/x-javascript', 'application/x-php', 'application/x-msdos-program', 'application/x-shellscript', 'application/x-bat', 'application/x-msdos-program', 'application/x-vbscript', 'application/x-perl', 'application/x-python'];

        formData.files.forEach(file => {
            const fileType = file.type;
            if (disallowedTypes.includes(fileType)) {
                isValid = false;
                notification.error({ message: t('errors.front-end.add-story.type-file') + " " + fileType + " " + t('errors.front-end.add-story.incorrect-file-type') });
            }
            if (!allowedImageTypes.includes(fileType) && !allowedVideoTypes.includes(fileType) && !allowedDocumentTypes.includes(fileType)) {
                isValid = false;
                notification.error({ message: t('errors.front-end.add-story.type-file') + " " + fileType + " " + t('errors.front-end.add-story.incorrect-file-type') });
            }
            if (file.size > 5 * 1024 * 1024) { // 5 MB
                isValid = false;
                notification.error({ message: t('errors.front-end.add-story.incorrect-file-size') });
            }
        });


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
            shortDescription: e.target.value
        });
    };


    const handleFileChange = (e) => {
        const { files } = e.target;
        setFormData({
            ...formData,
            files: [...formData.files, ...files]
        });
    };

    const handleStoryChange = (e) => {
        setFormData({
            ...formData,
            history: e.target.value
        });
    };

    const handleSubmit = () => {
        if (validateInput()) {
            // Form valid, send data to server

            setLoading(true);

            userService.postStory(formData)
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

    const handleAdminAdd = () => {
        if (validateInput()) {
            // Form valid, send data to server

            setLoading(true);

            userService.postStory(formData)
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

                <div className='header-container-2h'>
                    <h2 className='span-of-section-2h'>
                        {t('ref.control-panel')}
                    </h2>
                    <h1 className='header-of-section-2h'>
                        {t('add-photo.header')}
                    </h1>
                </div>

                <div className='container-form-new-photo'>
                    <div className='container-inputs-form-new-photo'>
                        <div className='container-inputs-form-inputs'>
                            <InputPhoto placeholder={t("add-photo.placeholder.photo-load")} name="placeName" id="placeName" type="text" onChange={handleInputChange} />
                            <InputSelect placeholder={t("add-photo.placeholder.place")} type="text" id="dateOfFoundation" name="dateOfFoundation" max="3000-01-01" min="1800-01-01" onChange={handleInputChange} />
                            <InputSelect placeholder={t("add-photo.placeholder.people")} type="text" id="countDeath" name="countDeath" onChange={handleInputChange} />

                            <div className='container-small-message'>
                                <span>Можно: Не добавлять узника</span>
                                <span>Можно: Добавить узника <a href="/story">(клик сюда)</a>, если его нету в списке</span>
                            </div>
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
                            <InputForm placeholder={t("add-camp.placeholder.camp-title")} name="placeName" id="placeName" type="text" onChange={handleInputChange} />
                            <InputShortDescription onDescriptionChange={handleDescriptionChange} />
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