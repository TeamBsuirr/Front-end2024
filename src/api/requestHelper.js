import { notification } from "antd";
import { t } from "i18next";

const handleRequest = async (request) => {
    try {
        const response = await request();

        if (response.data.content) return response.data.content;
        else return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response) {
            console.error("Error response:", error.response.data);
            console.error("Error status:", error.response.status);
            console.error("Error headers:", error.response.headers);

            let validationErrorsMessage = "";
            if (error.response.data.validationErrors) {
                const validationErrors = error.response.data.validationErrors;

                // Собираем ошибки в одну строку
                validationErrorsMessage = Object.entries(validationErrors)
                    .map(([field, errorMessage]) => {
                        return `${t(field)}: ${errorMessage}`;
                    })
                    .join("; ");
            }

            if (error.response.data.message) {
                notification.error({
                    message: t("errors.front-end.fetch.common"),
                    description:
                        t("errors.front-end.fetch.description") +
                        " " +
                        error.response.data.message +
                        " " +
                        validationErrorsMessage,
                });
            }

            if (error.response.message) {
                notification.error({
                    message: t("errors.front-end.fetch.common"),
                    description:
                        t("errors.front-end.fetch.description") +
                        " " +
                        error.response.message,
                });
            }
        } else if (error.request) {
            console.error("Error request:", error.request);
        } else {
            console.error("Error message:", error.message);
        }
        throw error;
    }
};

export default handleRequest;
