import { React, useState } from "react";
import "../../assets/styles/forms/NewPlace.css";
import { notification } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import InputShortDescription from "../inputs/InputShortDescription";
import InputForm from "../inputs/InputForm";
import InputDescription from "../inputs/InputDescription";
import ButtonSubmit from "../buttons/ButtonSubmit";
import Spinner from "../other/Spinner";
import HeaderSection from "../other/HeaderSection";
import placeService from "../../api/services/placeService";
import InputSelect from "../inputs/InputSelect";

export default function NewPlace({ objectOfPlace, isUpdate, arrayOfRegions }) {
    const { t } = useTranslation();
    const [isCaptchaValid, setIsCaptchaValid] = useState(false); // Новое состояние для капчи
    const [formData, setFormData] = useState(objectOfPlace);
    const [loading, setLoading] = useState(false);

    const onChangeCaptcha = (value) => {
        if (value) {
            setIsCaptchaValid(true); // Капча пройдена
        } else {
            setIsCaptchaValid(false); // Капча не пройдена
        }
    };

    const validateInput = () => {
        let isValid = true;
        
        // Validate text fields
        [
            "placeName",
            "locationDescription",
            "shortDescription",
            "placeName",
        ].forEach((field) => {
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
                        t("errors.front-end.") +
                        " " +
                        field +
                        " " +
                        t("errors.front-end.add-place.incorrect-symbols"),
                });
            }
        });

        // Validate history
        if (
            !formData.history.description ||
            formData.history.description.length < 1 ||
            formData.history.description.length > 10000
        ) {
            isValid = false;
            notification.error({
                message: t("errors.front-end.add-story.incorrect-length-story"),
            });
        }
        if (/["'<>]/.test(formData.history.description)) {
            isValid = false;
            notification.error({
                message: t(
                    "errors.front-end.add-story.incorrect-symbols-story",
                ),
            });
        }

        // Validate date of birth, start date and end date
        const today = new Date().toISOString().split("T")[0];
        if (!formData.dateOfFoundation || formData.dateOfFoundation >= today) {
            isValid = false;
            notification.error({
                message: t("errors.front-end.add-story.incorrect-dof"),
            });
        }

        // Validate countDeath (number), validate coordinates (number)
        // Validate countDeath (number)
        if (
            !formData.countDeath ||
            isNaN(formData.countDeath) ||
            formData.countDeath < 0
        ) {
            isValid = false;
            notification.error({
                message: t("errors.front-end.add-camp.invalid-countDeath"),
            });
        }

        // Validate coordinates (number)
        ["latitude", "longitude"].forEach((coord) => {
            if (
                !formData[coord] ||
                isNaN(formData[coord]) ||
                formData[coord] < -180 ||
                formData[coord] > 180
            ) {
                isValid = false;
                notification.error({
                    message: t("errors.front-end.add-camp.invalid-coordinates"),
                });
            }
        });

        //

        // Validate files
        const allowedImageTypes = [
            undefined,
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
            undefined,
            "video/mp4",
            "video/x-msvideo",
            "video/quicktime",
            "video/x-matroska",
            "video/x-flv",
            "video/x-ms-wmv",
            "video/webm",
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

        formData.images.forEach((file) => {
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
                !allowedVideoTypes.includes(fileType)
            ) {
                //console.log("not found good types")
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
                file.size > 5 * 1024 * 1024 &&
                !allowedVideoTypes.includes(fileType)
            ) {
                // 5 MB
                //console.log("size types")
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

    const handleFileChange = (files) => {
        // Ensure files are processed correctly
        const updatedFiles = Array.from(files);
        setFormData((prevFormData) => ({
            ...prevFormData,
            images: updatedFiles,
        }));
    };

    const handleStoryChange = (e) => {
        setFormData({
            ...formData,

            history: {
                description: e.target.value,
            },
        });
    };

    const handleDescriptionChange = (e) => {
        setFormData({
            ...formData,
            shortDescription: e.target.value,
        });
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        

        // Update the formData based on selected values
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

       
    };

    const handleSubmit = () => {
        if (validateInput()) {
            if (!isCaptchaValid) {
                notification.error({
                    message: t("errors.front-end.captcha-failed"),
                    description: t(t("errors.front-end.captcha-failed-msg")),
                });
                return; // Предотвратить отправку формы
            }
            // Form valid, send data to server

            setLoading(true);

            if (!isUpdate) {
                placeService
                    .postPlace(formData)
                    .then((response) => {
                        
                        if (response.status === 201 || !response.status) {
                            // Предположим, что 201 — код успешного добавления
                            notification.success({
                                message: t(
                                    "errors.front-end.add-story.success-camp",
                                ),
                            });
                        }
                        setLoading(false);

                        return response;
                    })
                    .catch((error) => {
                        // console.error('Ошибка получения результатов:', error);
                        let errMsg = error.message ? error.message : error;
                        notification.error({
                            message: t(
                                "errors.front-end.add-camp.common-create",
                            ),
                            description: errMsg,
                        });

                        setLoading(false);
                        throw error;
                    });
            } else {
                placeService
                    .updatePlace(formData)
                    .then((response) => {
                       
                        if (response.status === 201 || !response.status)
                            // Предположим, что 201 — код успешного добавления
                            notification.success({
                                message: t(
                                    "errors.front-end.update-story.success-camp",
                                ),
                            });
                        setLoading(false);
                        return response;
                    })
                    .catch((error) => {
                        // console.error('Ошибка получения результатов:', error);
                        let errMsg = error.message ? error.message : error;
                        notification.error({
                            message: t(
                                "errors.front-end.add-camp.common-create",
                            ),
                            description: errMsg,
                        });

                        setLoading(false);
                        throw error;
                    });
            }
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
                    textFirst={t("ref.control-panel")}
                    textSecond={t("add-camp.header")}
                    isCenteredText={false}
                />

                <div className="container-form-new-place">
                    <div className="container-inputs-form-new-place">
                        <div className="container-inputs-form-for-inputs">
                            <div className="container-inputs-form-inputs">
                                <InputForm
                                    placeholder={t(
                                        "add-camp.placeholder.camp-title",
                                    )}
                                    name="placeName"
                                    id="placeName"
                                    type="text"
                                    onChange={handleInputChange}
                                    value={formData.placeName}
                                />
                                <InputForm
                                    placeholder={t(
                                        "add-camp.placeholder.date-of-foundation",
                                    )}
                                    type="date"
                                    id="dateOfFoundation"
                                    name="dateOfFoundation"
                                    max="3000-01-01"
                                    min="1800-01-01"
                                    onChange={handleInputChange}
                                    value={formData.dateOfFoundation}
                                />
                                <InputForm
                                    placeholder={t(
                                        "add-camp.placeholder.number-of-deaths",
                                    )}
                                    type="number"
                                    id="countDeath"
                                    name="countDeath"
                                    onChange={handleInputChange}
                                    value={
                                        formData.countDeath !== 0
                                            ? formData.countDeath
                                            : ""
                                    }
                                />
                                <InputForm
                                    placeholder={t(
                                        "add-camp.placeholder.location",
                                    )}
                                    type="text"
                                    id="locationDescription"
                                    name="locationDescription"
                                    onChange={handleInputChange}
                                    value={formData.locationDescription}
                                />

                                <InputSelect
                                    name="region"
                                    value={formData.region}
                                    arrayOfSelects={arrayOfRegions} // Ensure arrayOfPlaces contains objects with an `id` and `name` property
                                    multiple={false}
                                    onChange={handleSelectChange}
                                    placeholder={t(
                                        "add-camp.placeholder.location",
                                    )}
                                />
                            </div>

                            <div className="container-inputs-for-coordinates">
                                <span>
                                    {t("add-camp.placeholder.coordinates")}
                                </span>
                                <div>
                                    <InputForm
                                        placeholder={t(
                                            "add-camp.placeholder.latitude",
                                        )}
                                        type="coordinates"
                                        id="latitude"
                                        name="latitude"
                                        onChange={handleInputChange}
                                        value={formData.coordinates?.latitude}
                                    />
                                    <InputForm
                                        placeholder={t(
                                            "add-camp.placeholder.longitude",
                                        )}
                                        type="coordinates"
                                        id="longitude"
                                        name="longitude"
                                        onChange={handleInputChange}
                                        value={formData.coordinates?.longitude}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="container-inputs-form-for-short-descr">
                            <InputShortDescription
                                onDescriptionChange={handleDescriptionChange}
                                shortValue={formData.shortDescription}
                            />
                        </div>
                    </div>
                    <InputDescription
                        typesDisallowed={["doc"]}
                        onFileChange={handleFileChange}
                        onStoryChange={handleStoryChange}
                        valueFiles={formData.images}
                        value={formData.history.description}
                    />
                </div>
            </section>

            <div className="container-add-form-button-new-place">
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
                    onClick={handleSubmit}
                    size
                />
            </div>
        </div>
    );
}
