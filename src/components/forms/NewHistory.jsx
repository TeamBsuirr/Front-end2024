import { React, useState } from 'react';
import '../../assets/styles/forms/NewHistory.css'

import InputForm from '../inputs/InputForm';
import DateForm from '../inputs/DateForm';
import InputDescription from '../inputs/InputDescription';
import ButtonSubmit from '../buttons/ButtonSubmit';
import { notification } from 'antd';
import userService from '../../api/services/userService';
import Spinner from '../other/Spinner';


export default function NewHistory() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        patronymic: "",
        dateOfBirth: "",
        placeOfBirth: "",
        placeOfStay: "",
        startDateOfStay: "",
        endDateOfStay: "",
        fio: "",
        phoneNumber: "",
        email: "",
        history: "",
        files: []
    });
    const [loading, setLoading] = useState(false);

    const validateInput = () => {
        let isValid = true;
        console.log(formData);
        // Validate name, surname, and patronymic
        ['firstName', 'lastName', 'patronymic'].forEach(field => {
            if (!formData[field] || formData[field].length < 1 || formData[field].length > 100) {
                isValid = false;
                notification.error({ message: `Поле ${field} должно содержать от 1 до 100 символов` });
            }
            if (/["'<>]/.test(formData[field])) {
                isValid = false;
                notification.error({ message: `Поле ${field} содержит недопустимые символы` });
            }
        });

        // Validate date of birth, start date and end date
        const today = new Date().toISOString().split('T')[0];
        if (!formData.dateOfBirth || formData.dateOfBirth >= today) {
            isValid = false;
            notification.error({ message: 'Некорректная дата рождения' });
        }
        if (formData.startDateOfStay >= formData.endDateOfStay) {
            isValid = false;
            notification.error({ message: 'Дата начала содержания не может быть позже или равна дате окончания' });
        }

        // Validate place of birth and place of stay
        ['placeOfBirth', 'placeOfStay'].forEach(field => {
            if (!formData[field] || formData[field].length < 1 || formData[field].length > 200) {
                isValid = false;
                notification.error({ message: `Поле ${field} должно содержать от 1 до 200 символов` });
            }
            if (/["'<>]/.test(formData[field])) {
                isValid = false;
                notification.error({ message: `Поле ${field} содержит недопустимые символы` });
            }
        });

        // Validate history
        if (!formData.history || formData.history.length < 1 || formData.history.length > 1000) {
            isValid = false;
            notification.error({ message: 'Поле история должно содержать от 1 до 1000 символов' });
        }
        if (/["'<>]/.test(formData.history)) {
            isValid = false;
            notification.error({ message: 'Поле история содержит недопустимые символы' });
        }

        // Validate phone number
        const phoneRegex = /^\+375 \(\d{2}\) \d{3} - \d{2} - \d{2}$/;
        if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
            isValid = false;
            notification.error({ message: 'Некорректный формат телефона' });
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            isValid = false;
            notification.error({ message: 'Некорректный email' });
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
                notification.error({ message: 'Файл типа ' + fileType + ' не разрешен для загрузки' });
            }
            if (!allowedImageTypes.includes(fileType) && !allowedVideoTypes.includes(fileType) && !allowedDocumentTypes.includes(fileType)) {
                isValid = false;
                notification.error({ message: 'Файл типа ' + fileType + ' не разрешен для загрузки' });
            }
            if (file.size > 5 * 1024 * 1024) { // 5 MB
                isValid = false;
                notification.error({ message: 'Размер файла не должен превышать 5 МБ' });
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
            history: e.target.value
        });
    };

    const handleSubmit = () => {
        if (validateInput()) {
            // Form valid, send data to server
            console.log("Form Data:", formData);
            setLoading(true);

            userService.postStory(formData)
                .then(response => {
                    console.log(response);
                    setLoading(false);
                    notification.success({ message: 'История успешно добавлена' });
                })
                .catch(error => {
                    console.error('Ошибка получения результатов:', error);
                    let errMsg = error.message ? error.message : error;
                    notification.error({
                        message: 'Ошибка получения результатов',
                        description: 'Ошибка получения данных узников и концлагерей с сервера: ' + errMsg
                    });
                    setLoading(false);
                });

            // axios.post('/your-endpoint', formData)
            //     .then(response => {
            //         notification.success({ message: 'История успешно добавлена' });
            //     })
            //     .catch(error => {
            //         notification.error({ message: 'Ошибка при отправке данных' });
            //     });
        }
    };

    return (
        <div className='section-new-history'>
            {loading ? (<>
                <Spinner size="large" />
            </>) : (<></>)
            }

            <section className='section-form-new-history'>

                <div className='header-container-new-history'>
                    <h1 className='header-of-section'>
                        ДОБАВИТЬ ИСТОРИЮ
                    </h1>
                </div>

                <div className='container-form-new-history'>
                    <div className='container-inputs-form-new-history'>
                        <InputForm placeholder="Фамилия участника" name="lastName" id="lastName" type="text" onChange={handleInputChange} />
                        <InputForm placeholder="Имя участника" type="text" id="firstName" name="firstName" onChange={handleInputChange} />
                        <InputForm placeholder="Отчество участника" type="text" id="patronymic" name="patronymic" onChange={handleInputChange} />
                        <InputForm placeholder="Дата рождения" type="date" id="dateOfBirth" name="dateOfBirth" max="3000-01-01" min="1800-01-01" onChange={handleInputChange} />
                        <InputForm placeholder="Место рождения" type="text" id="placeOfBirth" name="placeOfBirth" onChange={handleInputChange} />
                        <InputForm placeholder="Место содержания" type="text" id="placeOfStay" name="placeOfStay" onChange={handleInputChange} />
                        <div className="date-range">
                            <DateForm labelText="с" type="date" id="startDateOfStay" name="startDateOfStay" max="2000-01-01" min="1800-01-01" onChange={handleInputChange} />
                            <DateForm labelText="по" type="date" id="endDateOfStay" name="endDateOfStay" max="2000-01-01" min="1800-01-01" onChange={handleInputChange} />
                        </div>
                    </div>
                    <InputDescription onFileChange={handleFileChange} onStoryChange={handleStoryChange} />

                </div>


            </section>
            {/* ADD TOP BORDER TO THIS */}
            <section className='section-register-new-history'>
                <div className='container-register-header-new-history'>
                    <div>
                        <h2>КОНТАКТНЫЕ ДАННЫЕ</h2>
                    </div>
                    <div style={{ marginTop: -35, }}>
                        <span>Укажите свои личные данные, чтобы добавить историю</span>
                    </div>


                </div>
                <div className='container-register-form-new-history'>
                    <div className='container-register-form-inputs-new-history'>
                        <InputForm placeholder="ФИО" type="text" name="fio" onChange={handleInputChange} />
                        <InputForm placeholder="Телефон" type="tel" name="phoneNumber" onChange={handleInputChange} />
                        <InputForm placeholder="Email" type="email" name="email" onChange={handleInputChange} />
                    </div>

                    <div className='container-register-form-button-new-history'>
                        <ButtonSubmit
                            isColorsInverse={true}
                            themeColor="yellow"
                            href="none"
                            spanText='ДОБАВИТЬ МОЮ ИСТОРИЮ'
                            onClick={handleSubmit}

                            size />
                    </div>

                </div>
            </section>

        </div>
    )
}