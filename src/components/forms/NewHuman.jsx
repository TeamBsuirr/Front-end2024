import { React, useState } from 'react';
import '../../assets/styles/forms/NewHistory.css'
import InputForm from '../inputs/InputForm';
import DateForm from '../inputs/DateForm';
import InputDescription from '../inputs/InputDescription';
import ButtonSubmit from '../buttons/ButtonSubmit';
import { notification } from 'antd';
import Spinner from '../other/Spinner';
import { useTranslation } from 'react-i18next';
import HeaderSection from '../other/HeaderSection';
import ReCAPTCHA from 'react-google-recaptcha';
import humanService from '../../api/services/humanService';
import InputSelect from '../inputs/InputSelect';


export default function NewHuman({ arrayOfPlaces, objectOfPrisoners, isUpdate }) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState(objectOfPrisoners);

    const [loading, setLoading] = useState(false);
    const [isCaptchaValid, setIsCaptchaValid] = useState(false); // Новое состояние для капчи

    const onChangeCaptcha = (value) => {
        if (value) {
            setIsCaptchaValid(true); // Капча пройдена
        } else {
            setIsCaptchaValid(false); // Капча не пройдена
        }
    };
    

    const validateInput = () => {
        let isValid = true;

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
        if (!formData.dateOfBirth || formData.dateOfBirth >= today || formData.dateOfBirth >= formData.dateOfDie) {
            isValid = false;
            notification.error({ message: t('errors.front-end.add-story.incorrect-dof') });
        }
        if (!formData.dateOfDie || formData.dateOfBirth >= today || formData.dateOfBirth >= formData.dateOfDie) {
            isValid = false;
            notification.error({ message: t('errors.front-end.add-story.incorrect-dod') });
        }
        formData.places.forEach((place, index) => {
            if (place.dateFrom > place.dateTo) {
                isValid = false;
                notification.error({ message: t('errors.front-end.add-story.incorrect-dot') + ` (Place: ${place.place?.placeName ?? place.name})` });
            }
        });


        // Validate place of birth and place of stay
        ['placeOfBirth'].forEach(field => {
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
        if (!formData.history || formData.history.length < 1 || formData.history.length > 10000) {
            isValid = false;
            notification.error({ message: t('errors.front-end.add-story.incorrect-length-story') });
        }
        if (/[<>]/.test(formData.history)) {
            isValid = false;
            notification.error({ message: t('errors.front-end.add-story.incorrect-symbols-story') });
        }


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


    const handleFileChange = (files) => {
        // Ensure files are processed correctly
        const updatedFiles = Array.from(files);
        setFormData(prevFormData => ({
            ...prevFormData,
            files: updatedFiles
        }));
    };

    const handleStoryChange = (e) => {
        setFormData({
            ...formData,
            history: e.target.value
        });
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        //console.log('Received value:', name, value);

        // Update the formData based on selected values
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateRangeChange = (index, dateType, value) => {
        const updatedPlaces = [...formData.places];

        updatedPlaces[index][dateType] = value;

        setFormData({
            ...formData,
            places: updatedPlaces
        });
    };

    const handleAdminAdd = () => {
        if (!isCaptchaValid) {
            notification.error({
                 message: t('errors.front-end.captcha-failed'), 
                 description:t(t('errors.front-end.captcha-failed-msg'))
            });
            return; // Предотвратить отправку формы
        }
        if (validateInput()) {
            // Form valid, send data to server

            setLoading(true);
            if(!isUpdate) {
                    humanService.postHuman(formData)
                    .then(response => {
                        
                        setLoading(false);
                        notification.success({ message: t('errors.front-end.add-story.success') });
                        
                    })
                    .catch(error => {
                        let errMsg = error.message ? error.message : error;
                        notification.error({
                            message: t('errors.front-end.add-story.error-receive'),
                            description: t('errors.front-end.add-story.error-receive-description') + ' ' + errMsg
                        });

                        setLoading(false);
                    });
                }     
            else
                {
                  
                    humanService.updateHuman(formData)
                    .then(response => {
                        setLoading(false);
                        notification.success({ message: t('errors.front-end.update-story.success') });
                        
                    })
                    .catch(error => {
                        let errMsg = error.message ? error.message : error;
                        notification.error({
                            message: t('errors.front-end.add-story.error-receive'),
                            description: t('errors.front-end.add-story.error-receive-description') + ' ' + errMsg
                        });

                        setLoading(false);
                    });
                }
               
        }
    };

    return (
        <div className='section-new-history'>
            {loading ? (<>
                <Spinner size="large" />
            </>) : (<></>)
            }

            <section className='section-form-new-history'>

                <HeaderSection textFirst={t("add-story.header")} isCenteredText={true} />

                <div className='container-form-new-history'>
                    <div className='container-inputs-form-new-history'>
                        <InputForm placeholder={t("add-story.placeholder.surname")} name="surname" id="surname" type="text" onChange={handleInputChange} value={formData.surname} />
                        <InputForm placeholder={t("add-story.placeholder.name")} type="text" id="name" name="name" onChange={handleInputChange} value={formData.name} />
                        <InputForm placeholder={t("add-story.placeholder.patronymic")} type="text" id="patronymic" name="patronymic" onChange={handleInputChange} value={formData.patronymic} />
                        <div className='container-input-span'>
                            <InputForm placeholder={t("add-story.placeholder.date-of-birth")} type="date" id="dateOfBirth" name="dateOfBirth" max="3000-01-01" min="1800-01-01" onChange={handleInputChange} value={formData.dateOfBirth} />
                            <span>{t("add-story.placeholder.date-of-birth")}</span>
                        </div>
                        <div className='container-input-span'>
                        <InputForm placeholder={t("add-story.placeholder.date-of-death")} type="date" id="dateOfDie" name="dateOfDie" max="3000-01-01" min="1800-01-01" onChange={handleInputChange} value={formData.dateOfDie} />
                        <span>{t("add-story.placeholder.date-of-death")}</span>
                        </div>

                        <InputForm placeholder={t("add-story.placeholder.place-of-birth")} type="text" id="placeOfBirth" name="placeOfBirth" onChange={handleInputChange} value={formData.placeOfBirth} />


                        <InputSelect
                            name="places"
                            value={formData.places}
                            arrayOfSelects={arrayOfPlaces}  // Ensure arrayOfPlaces contains objects with an `id` and `name` property
                            multiple={true}
                            onChange={handleSelectChange}
                            placeholder={t("add-story.placeholder.place-of-detention")}
                        />

                        {/* <div className="date-range">
                            <DateForm labelText={t("add-story.placeholder.date-from")} type="date" id="dateFrom" name="dateFrom" max="2000-01-01" min="1800-01-01" onChange={handleInputChange} value={formData.dateFrom} />
                            <DateForm labelText={t("add-story.placeholder.date-to")} type="date" id="dateTo" name="dateTo" max="2000-01-01" min="1800-01-01" onChange={handleInputChange} value={formData.dateTo} />
                        </div> */}

                        {formData.places.map((place, index) => (

                            <div className='container-date-range'>
                                <div key={index} className="date-range">
                                    <DateForm
                                        labelText={t("add-story.placeholder.date-from")}
                                        type="date"
                                        id={`dateFrom-${index}`}
                                        name={`dateFrom-${index}`}
                                        max="3000-01-01"
                                        min="1800-01-01"
                                        onChange={e => handleDateRangeChange(index, 'dateFrom', e.target.value)}
                                        value={place.dateFrom}
                                    />


                                    <DateForm
                                        labelText={t("add-story.placeholder.date-to")}
                                        type="date"
                                        id={`dateTo-${index}`}
                                        name={`dateTo-${index}`}
                                        max="3000-01-01"
                                        min="1800-01-01"
                                        onChange={e => handleDateRangeChange(index, 'dateTo', e.target.value)}
                                        value={place.dateTo}
                                    />

                                </div>
                                <span>({place.place?.placeName ?? place.name})</span>
                            </div>
                        ))}
                    </div>
                    <InputDescription typesDisallowed={["doc"]} onFileChange={handleFileChange} onStoryChange={handleStoryChange} valueFiles={formData.files}  value={formData.history} />

                </div>


            </section>

            <>
                <div className='container-add-form-button-new-history'>
                    <div>
                        <ReCAPTCHA
                            sitekey={process.env.REACT_APP_RECAPTCHA_API_KEY}
                            onChange={onChangeCaptcha}
                        />
                    </div>



                    <ButtonSubmit
                        isColorsInverse={true}
                        themeColor="yellow"
                        href="none"
                        spanText={t("admin-panel.btn.add")}
                        onClick={handleAdminAdd}
                        size />
                </div>
            </>




        </div >
    )
}