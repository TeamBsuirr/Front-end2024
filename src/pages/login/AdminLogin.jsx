import React, { useState } from "react";
import userService from "../../api/services/userService";
import PageTemplate from "../../components/other/PageTemplate";
import { useTranslation } from "react-i18next";
import "../../assets/styles/forms/AdminLogin.css";
import InputForm from "../../components/inputs/InputForm";
import ButtonSubmit from "../../components/buttons/ButtonSubmit";
import ReCAPTCHA from "react-google-recaptcha";
import { notification } from "antd";
import useLocalizedNavigate from "../../utils/useLocalizedNavigate";

const AdminLogin = () => {
    const navigate = useLocalizedNavigate();
    const { t } = useTranslation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isCaptchaValid, setIsCaptchaValid] = useState(false); // Новое состояние для капчи

    const handleLogin = async () => {
        if (!isCaptchaValid) {
            notification.error({
                message: t("errors.front-end.captcha-failed"),
                description: t(t("errors.front-end.captcha-failed-msg")),
            });
            return; // Предотвратить отправку формы
        }

        try {
            const response = await userService.authenticateAdmin({
                username,
                password,
            });
            const { accessToken, refreshToken } = response;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            setError(null); // Сброс ошибки при успешной авторизации
            // console.log('Admin logged in successfully');
            notification.success({ message: t("admin-panel.msg.success") });

            setTimeout(() => navigate("/crud"), 1000);
            // Здесь можно выполнить дополнительные действия, например, перенаправление на защищенную страницу
        } catch (err) {
            setError("Failed to login as admin");
            notification.error({
                message: t("admin-panel.msg.error") + error,
            });
            console.error("Error logging in:", err);
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
        <PageTemplate
            content={t("admin-panel.authorization.header")}
            contentSection={
                <div className="login-container">
                    <div className="login-input-container">
                        <InputForm
                            placeholder={t("admin-panel.authorization.login")}
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="login-input-container">
                        <InputForm
                            placeholder={t(
                                "admin-panel.authorization.password",
                            )}
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="login-captcha-container">
                        <ReCAPTCHA
                            sitekey={process.env.REACT_APP_RECAPTCHA_API_KEY}
                            onChange={onChangeCaptcha}
                        />
                    </div>

                    <div className="login-btn-container">
                        <ButtonSubmit
                            isColorsInverse={true}
                            themeColor="yellow"
                            href="none"
                            spanText={t("admin-panel.btn.enter")}
                            onClick={handleLogin}
                            size="s"
                        />
                    </div>
                </div>
            }
        />
    );
};

export default AdminLogin;
