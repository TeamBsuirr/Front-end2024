import { React, useState } from "react";
import "../../assets/styles/forms/NewHistory.css";

import InputForm from "../inputs/InputForm";
import DateForm from "../inputs/DateForm";
import InputDescription from "../inputs/InputDescription";
import ButtonSubmit from "../buttons/ButtonSubmit";
import { notification } from "antd";
import userService from "../../api/services/userService";
import Spinner from "../other/Spinner";
import { useTranslation } from "react-i18next";
import HeaderSection from "../other/HeaderSection";
import ReCAPTCHA from "react-google-recaptcha";

export default function NewHistory() {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        patronymic: "",
        dateOfBirth: "",
        dateOfDie: "",
        placeOfBirth: "",
        placeOfDetention: "",
        dateFrom: "",
        dateTo: "",
        fio: "",
        phoneNumber: "",
        email: "",
        history: "",
        files: [],
    });

    const [loading, setLoading] = useState(false);
    const [isCaptchaValid, setIsCaptchaValid] = useState(false); // Новое состояние для капчи

    const validateInput = () => {
        let isValid = true;
        //console.log(formData);
        // Validate name, surname, and patronymic
        ["name", "surname", "patronymic"].forEach((field) => {
            if (
                !formData[field] ||
                formData[field].length < 1 ||
                formData[field].length > 100
            ) {
                isValid = false;

                notification.error({
                    message:
                        t("errors.front-end.add-story.field") +
                        " " +
                        field +
                        " " +
                        t("errors.front-end.add-story.symbol-length"),
                });
            }
            if (/["'<>]/.test(formData[field])) {
                isValid = false;
                notification.error({
                    message:
                        t("errors.front-end.add-story.field") +
                        " " +
                        field +
                        " " +
                        t("errors.front-end.add-story.incorrect-symbols"),
                });
            }
        });

        // Validate date of birth, start date and end date
        // 1 old if
        const today = new Date().toISOString().split("T")[0];
        // if (!formData.dateOfBirth || formData.dateOfBirth >= today) {
        //     isValid = false;
        //     notification.error({ message: t('errors.front-end.add-story.incorrect-dof') });
        // }
        // new 2 ifs
        if (
            !formData.dateOfBirth ||
            formData.dateOfBirth >= today ||
            formData.dateOfBirth >= formData.dateOfDie
        ) {
            isValid = false;
            notification.error({
                message: t("errors.front-end.add-story.incorrect-dof"),
            });
        }
        if (
            !formData.dateOfDie ||
            formData.dateOfBirth >= today ||
            formData.dateOfBirth >= formData.dateOfDie
        ) {
            isValid = false;
            notification.error({
                message: t("errors.front-end.add-story.incorrect-dod"),
            });
        }

        if (formData.dateFrom >= formData.dateTo) {
            isValid = false;
            notification.error({
                message: t("errors.front-end.add-story.incorrect-dot"),
            });
        }

        // Validate place of birth and place of stay
        ["placeOfBirth", "placeOfDetention"].forEach((field) => {
            if (
                !formData[field] ||
                formData[field].length < 1 ||
                formData[field].length > 200
            ) {
                isValid = false;
                notification.error({
                    message:
                        t("errors.front-end.add-story.field") +
                        " " +
                        field +
                        " " +
                        t("errors.front-end.add-story.symbol-length-place"),
                });
            }
            if (/["'<>]/.test(formData[field])) {
                isValid = false;
                notification.error({
                    message:
                        t("errors.front-end.add-story.field") +
                        " " +
                        field +
                        " " +
                        t("errors.front-end.add-story.incorrect-symbols"),
                });
            }
        });

        // Validate history
        if (
            !formData.history ||
            formData.history.length < 1 ||
            formData.history.length > 10000
        ) {
            isValid = false;
            notification.error({
                message: t("errors.front-end.add-story.incorrect-length-story"),
            });
        }
        if (/["'<>]/.test(formData.history)) {
            isValid = false;
            notification.error({
                message: t(
                    "errors.front-end.add-story.incorrect-symbols-story",
                ),
            });
        }

        // Validate phone number
        const phoneRegex = /^\+375 \(\d{2}\) \d{3} - \d{2} - \d{2}$/;
        if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
            isValid = false;
            notification.error({
                message: t("errors.front-end.add-story.incorrect-phone"),
            });
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            isValid = false;
            notification.error({
                message: t("errors.front-end.add-story.incorrect-email"),
            });
        }

        // Validate files
        const allowedImageTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/bmp",
            "image/tiff",
            "image/svg+xml",
            "image/webp",
            "image/x-icon",
            "image/vnd.microsoft.icon",
            "image/heic",
            "image/heif",
            "image/x-canon-cr2",
            "image/x-nikon-nef",
            "image/x-sony-arw",
            "image/x-olympus-orf",
            "image/x-panasonic-rw2",
            "image/x-fujifilm-raf",
            "image/x-adobe-dng",
        ];
        const allowedVideoTypes = [
            "video/mp4",
            "video/x-msvideo",
            "video/quicktime",
            "video/x-matroska",
            "video/x-flv",
            "video/x-ms-wmv",
            "video/webm",
        ];
        const allowedDocumentTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "text/plain",
            "text/csv",
            "application/zip",
            "application/x-rar-compressed",
        ];
        const disallowedTypes = [
            "application/x-javascript",
            "application/x-php",
            "application/x-msdos-program",
            "application/x-shellscript",
            "application/x-bat",
            "application/x-msdos-program",
            "application/x-vbscript",
            "application/x-perl",
            "application/x-python",
        ];

        formData.files.forEach((file) => {
            const fileType = file.type;
            if (disallowedTypes.includes(fileType)) {
                isValid = false;
                notification.error({
                    message:
                        t("errors.front-end.add-story.type-file") +
                        " " +
                        fileType +
                        " " +
                        t("errors.front-end.add-story.incorrect-file-type"),
                });
            }
            if (
                !allowedImageTypes.includes(fileType) &&
                !allowedVideoTypes.includes(fileType) &&
                !allowedDocumentTypes.includes(fileType)
            ) {
                isValid = false;
                notification.error({
                    message:
                        t("errors.front-end.add-story.type-file") +
                        " " +
                        fileType +
                        " " +
                        t("errors.front-end.add-story.incorrect-file-type"),
                });
            }
            if (file.size > 5 * 1024 * 1024) {
                // 5 MB
                isValid = false;
                notification.error({
                    message: t(
                        "errors.front-end.add-story.incorrect-file-size",
                    ),
                });
            }
        });

        return isValid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const handleFileChange = (e) => {
    //     const { files } = e.target;
    //     setFormData({
    //         ...formData,
    //         files: [...formData.files, ...files]
    //     });
    // };

    const handleFileChange = (files) => {
        // Ensure files are processed correctly
        const updatedFiles = Array.from(files);
        setFormData((prevFormData) => ({
            ...prevFormData,
            files: updatedFiles,
        }));
    };

    const handleStoryChange = (e) => {
        setFormData({
            ...formData,
            history: e.target.value,
        });
    };

    const handleSubmit = () => {
        if (!isCaptchaValid) {
            notification.error({
                message: t("errors.front-end.captcha-failed"),
                description: t(t("errors.front-end.captcha-failed-msg")),
            });
            return; // Предотвратить отправку формы
        }

        if (validateInput()) {
            // Form valid, send data to server

            setLoading(true);

            userService
                .postStory(formData)
                .then((response) => {
                    setLoading(false);
                    if (response.status === 201 || !response.status)
                        notification.success({
                            message: t("errors.front-end.add-story.success"),
                        });
                    return response;
                })
                .catch((error) => {
                    let errMsg = error.message ? error.message : error;
                    notification.error({
                        message: t("errors.front-end.add-story.error-receive"),
                        description:
                            t(
                                "errors.front-end.add-story.error-receive-description",
                            ) +
                            " " +
                            errMsg,
                    });

                    setLoading(false);
                    throw error;
                });
        }
    };

    const onChangeCaptcha = (value) => {
        if (value) {
            setIsCaptchaValid(true); // Капча пройдена
        } else {
            setIsCaptchaValid(false); // Капча не пройдена
        }
    };

    return (
        <div className="section-new-history">
            {loading ? (
                <>
                    <Spinner size="large" />
                </>
            ) : (
                <></>
            )}

            <section className="section-form-new-history">
                <HeaderSection
                    textFirst={t("add-story.header")}
                    isCenteredText={true}
                />

                <div className="container-form-new-history">
                    <div className="container-inputs-form-new-history">
                        <InputForm
                            placeholder={t("add-story.placeholder.surname")}
                            name="surname"
                            id="surname"
                            type="text"
                            onChange={handleInputChange}
                            value={formData.surname}
                        />
                        <InputForm
                            placeholder={t("add-story.placeholder.name")}
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleInputChange}
                            value={formData.name}
                        />
                        <InputForm
                            placeholder={t("add-story.placeholder.patronymic")}
                            type="text"
                            id="patronymic"
                            name="patronymic"
                            onChange={handleInputChange}
                            value={formData.patronymic}
                        />

                        <div className="container-input-span">
                            <InputForm
                                placeholder={t(
                                    "add-story.placeholder.date-of-birth",
                                )}
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                max="3000-01-01"
                                min="1800-01-01"
                                onChange={handleInputChange}
                                value={formData.dateOfBirth}
                            />
                            <span>
                                {t("add-story.placeholder.date-of-birth")}
                            </span>
                        </div>
                        <div className="container-input-span">
                            <InputForm
                                placeholder={t(
                                    "add-story.placeholder.date-of-death",
                                )}
                                type="date"
                                id="dateOfDie"
                                name="dateOfDie"
                                max="3000-01-01"
                                min="1800-01-01"
                                onChange={handleInputChange}
                                value={formData.dateOfDie}
                            />
                            <span>
                                {t("add-story.placeholder.date-of-death")}
                            </span>
                        </div>

                        <InputForm
                            placeholder={t(
                                "add-story.placeholder.place-of-birth",
                            )}
                            type="text"
                            id="placeOfBirth"
                            name="placeOfBirth"
                            onChange={handleInputChange}
                            value={formData.placeOfBirth}
                        />
                        <InputForm
                            placeholder={t(
                                "add-story.placeholder.place-of-detention",
                            )}
                            type="text"
                            id="placeOfDetention"
                            name="placeOfDetention"
                            onChange={handleInputChange}
                            value={formData.placeOfDetention}
                        />
                        <div className="date-range">
                            <DateForm
                                labelText={t("add-story.placeholder.date-from")}
                                type="date"
                                id="dateFrom"
                                name="dateFrom"
                                max="2000-01-01"
                                min="1800-01-01"
                                onChange={handleInputChange}
                                value={formData.dateFrom}
                            />
                            <DateForm
                                labelText={t("add-story.placeholder.date-to")}
                                type="date"
                                id="dateTo"
                                name="dateTo"
                                max="2000-01-01"
                                min="1800-01-01"
                                onChange={handleInputChange}
                                value={formData.dateTo}
                            />
                        </div>
                    </div>
                    <InputDescription
                        onFileChange={handleFileChange}
                        onStoryChange={handleStoryChange}
                        value={formData.history}
                    />
                </div>
            </section>

            <section className="section-register-new-history">
                {/* ADD TOP BORDER TO THIS */}
                <div className="container-register-header-new-history">
                    <div>
                        <h2>{t("add-story.header-personal-data")}</h2>
                    </div>
                    <div style={{ marginTop: -35 }}>
                        <span>
                            {t("add-story.header-description-personal-data")}
                        </span>
                    </div>
                </div>
                <div className="container-register-form-new-history">
                    <div className="container-register-form-inputs-new-history">
                        <InputForm
                            placeholder={t("add-story.placeholder.your-name")}
                            type="text"
                            name="fio"
                            onChange={handleInputChange}
                        />
                        <InputForm
                            placeholder={t("add-story.placeholder.phone")}
                            type="tel"
                            name="phoneNumber"
                            onChange={handleInputChange}
                        />
                        <InputForm
                            placeholder="Email"
                            type="email"
                            name="email"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="container-register-form-button-new-history">
                        <div>
                            <ReCAPTCHA
                                sitekey={
                                    process.env.REACT_APP_RECAPTCHA_API_KEY
                                }
                                onChange={onChangeCaptcha}
                            />
                        </div>

                        <ButtonSubmit
                            isColorsInverse={true}
                            themeColor="yellow"
                            href="none"
                            spanText={t("add-story.btn.add-my-story")}
                            onClick={handleSubmit}
                            size
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
