import { React, useState } from 'react';
import '../../assets/styles/forms/NewPlace.css'


import { notification } from 'antd';
import userService from '../../api/services/userService';

import { useTranslation } from 'react-i18next';
import InputShortDescription from '../inputs/InputShortDescription';
import InputForm from '../inputs/InputForm';
import InputDescription from '../inputs/InputDescription';
import ButtonSubmit from '../buttons/ButtonSubmit';
import Spinner from '../other/Spinner';
import HeaderSection from '../other/HeaderSection';
import placeService from '../../api/services/placeService';


export default function NewPlace({ isAdmin = false }) {
    const { t } = useTranslation();

    const [formData, setFormData] = useState(
        {
            "placeName": "",
            "countDeath": 0,

            "article": "Заголовок истории",
            "description": "",

            "regionId": 1,
            "files": [
            ],
            "dateOfFoundation": "",
            "locationDescription": "",
            "shortDescription": "",

            "latitude": 0,
            "longitude": 0

        }
    );


    const [loading, setLoading] = useState(false);

    const validateInput = () => {
        let isValid = true;
        console.log(formData);
        // Validate text fields
        ['placeName', 'locationDescription', 'shortDescription', 'article'].forEach(field => {
            if (!formData[field] || formData[field].length < 1 || formData[field].length > 100) {
                isValid = false;
                notification.error({ message: t('errors.front-end.') + " " + field + " " + t('errors.front-end.add-place.symbol-length') });
            }
            if (/["'<>]/.test(formData[field])) {
                isValid = false;
                notification.error({ message: t('errors.front-end.') + " " + field + " " + t('errors.front-end.add-place.incorrect-symbols') });
            }
        });

        // Validate history
        if (!formData.description || formData.description.length < 1 || formData.description.length > 1000) {
            isValid = false;
            notification.error({ message: t('errors.front-end.tory') });
        }
        if (/["'<>]/.test(formData.description)) {
            isValid = false;
            notification.error({ message: t('errors.front-end.tory') });
        }

        // Validate date of birth, start date and end date
        const today = new Date().toISOString().split('T')[0];
        if (!formData.dateOfFoundation || formData.dateOfFoundation >= today) {
            isValid = false;
            notification.error({ message: t('errors.front-end.of') });
        }

        // Validate countDeath (number), validate coordinates (number)
        // Validate countDeath (number)
        if (isNaN(formData.countDeath) || formData.countDeath < 0) {
            isValid = false;
            notification.error({ message: t('errors.front-end.add-place.invalid-countDeath') });
        }

        // Validate coordinates (number)
        ['latitude', 'longitude'].forEach(coord => {
            if (isNaN(formData[coord]) || formData[coord] < -180 || formData[coord] > 180) {
                isValid = false;
                notification.error({ message: t('errors.front-end.add-place.invalid-coordinates') });
            }
        });


        // 

        // Validate files
        const allowedImageTypes = [
            'image/jpeg', 'image/png', 'image/gif', 'image/bmp',
            'image/tiff', 'image/svg+xml', 'image/webp',
            'image/x-icon', 'image/vnd.microsoft.icon', 'image/heic',
            'image/heif', 'image/x-canon-cr2', 'image/x-nikon-nef',
            'image/x-sony-arw', 'image/x-olympus-orf', 'image/x-panasonic-rw2',
            'image/x-fujifilm-raf', 'image/x-adobe-dng'
        ];
        const allowedVideoTypes = ['video/mp4', 'video/x-msvideo', 'video/quicktime', 'video/x-matroska', 'video/x-flv', 'video/x-ms-wmv', 'video/webm'];
        const disallowedTypes = ['application/x-javascript', 'application/x-php', 'application/x-msdos-program', 'application/x-shellscript', 'application/x-bat', 'application/x-msdos-program', 'application/x-vbscript', 'application/x-perl', 'application/x-python'];

        formData.files.forEach(file => {
            const fileType = file.type;
            console.log(file)
            if (disallowedTypes.includes(fileType)) {
                console.log("disaollew types")
                isValid = false;
                notification.error({ message: t('errors.front-end.add-place.type-file') + " " + fileType + " " + t('errors.front-end.add-place.incorrect-file-type') });
            }
            if (!allowedImageTypes.includes(fileType) && !allowedVideoTypes.includes(fileType)) {
                console.log("not found good types")
                isValid = false;
                notification.error({ message: t('errors.front-end.add-place.type-file') + " " + fileType + " " + t('errors.front-end.add-place.incorrect-file-type') });
            }
            if (file.size > 5 * 1024 * 1024 && !allowedVideoTypes.includes(fileType)) { // 5 MB
                console.log("size types")
                isValid = false;
                notification.error({ message: t('errors.front-end.add-place.incorrect-file-size') });
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

            description: e.target.value
        });
    };

    const handleDescriptionChange = (e) => {
        setFormData({
            ...formData,
            shortDescription: e.target.value
        });
    };

    const handleSubmit = () => {
        if (validateInput()) {
            // Form valid, send data to server

            setLoading(true);

            placeService.postPlace(formData)
                .then(response => {
                    // console.log(response);
                    setLoading(false);
                    notification.success({ message: t('errors.front-end.add-place.success') });

                })
                .catch(error => {
                    // console.error('Ошибка получения результатов:', error);
                    let errMsg = error.message ? error.message : error;
                    notification.error({
                        message: t('errors.front-end.'),
                        description: t('errors.front-end.') + ' ' + errMsg
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
                    notification.success({ message: t('errors.front-end.add-place.success') });

                })
                .catch(error => {
                    // console.error('Ошибка получения результатов:', error);
                    let errMsg = error.message ? error.message : error;
                    notification.error({
                        message: t('errors.front-end.add-place.error-receive'),
                        description: t('errors.front-end.add-place.error-receive-description') + ' ' + errMsg
                    });

                    setLoading(false);
                });
        }
    };

    return (
        <div className='section-new-history'>
            {loading ? (<>
                <Spinner size="large" />
            </>) : (<></>)
            }

            <section className='section-form-new-history'>

                <HeaderSection textFirst={t('ref.control-panel')} textSecond={t('add-camp.header')} isCenteredText={false} />

                <div className='container-form-new-place'>
                    <div className='container-inputs-form-new-place'>
                        <div className='container-inputs-form-for-inputs'>
                            <div className='container-inputs-form-inputs'>
                                <InputForm placeholder={t("add-camp.placeholder.camp-title")} name="placeName" id="placeName" type="text" onChange={handleInputChange} value={formData.placeName} />
                                <InputForm placeholder={t("add-camp.placeholder.date-of-foundation")} type="date" id="dateOfFoundation" name="dateOfFoundation" max="3000-01-01" min="1800-01-01" onChange={handleInputChange} value={formData.dateOfFoundation} />
                                <InputForm placeholder={t("add-camp.placeholder.number-of-deaths")} type="number" id="countDeath" name="countDeath" onChange={handleInputChange} value={formData.countDeath} />
                                <InputForm placeholder={t("add-camp.placeholder.location")} type="text" id="locationDescription" name="locationDescription" onChange={handleInputChange} value={formData.locationDescription} />
                            </div>

                            <div className='container-inputs-for-coordinates'>
                                <span>{t('add-camp.placeholder.coordinates')}</span>
                                <div>
                                    <InputForm placeholder={t("add-camp.placeholder.latitude")} type="coordinates" id="latitude" name="latitude" onChange={handleInputChange} value={formData.latitude} />
                                    <InputForm placeholder={t("add-camp.placeholder.longitude")} type="coordinates" id="longitude" name="longitude" onChange={handleInputChange} value={formData.longitude} />
                                </div>

                            </div>
                        </div>
                        <div className='container-inputs-form-for-short-descr'>
                            <InputShortDescription onDescriptionChange={handleDescriptionChange} shortValue={formData.shortDescription} />
                        </div>
                    </div>
                    <InputDescription typesDisallowed={["doc"]} onFileChange={handleFileChange} onStoryChange={handleStoryChange} value={formData.description} />
                </div>
            </section>


            <div className='container-add-form-button-new-place'>
                <ButtonSubmit
                    isColorsInverse={true}
                    themeColor="yellow"
                    href="none"
                    spanText={t("admin-panel.btn.add")}
                    onClick={handleSubmit}
                    size />
            </div>
        </div >
    )
}