import { useState } from "react";
import styles from "./AuthPage.module.scss";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/login";
import { getUserInfo } from "../../api/info";

const AuthPage: React.FC = () => {
    const [loginInput, setLoginInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { accessToken } = await loginUser({
                login: loginInput,
                password: passwordInput,
            });

            const userInfoResponse = await getUserInfo(accessToken);
            console.log(userInfoResponse);

            const user = {
                name: "Aleksey",
                avatar: "/images/header-avatar.svg",
                usedCompanyCount: userInfoResponse.eventFiltersInfo.usedCompanyCount,
                companyLimit: userInfoResponse.eventFiltersInfo.companyLimit,
            };

            login(accessToken, user);
            navigate("/search");
        } catch (err) {
            console.error("Ошибка авторизации", err);
            setError("Неверный логин или пароль")
        }
    };

    return (
        <section className={styles.authSection}>
            <div className={styles.container}>

                <div className={styles.left}>
                    <p className={styles.title}>Для оформления подписки на тариф, необходимо авторизоваться.</p>
                    <img className={styles.img} src="/images/AuthPage/auth-section-img.svg" alt="Иллюстрация" />
                </div>

                <div className={styles.formWrapper}>
                    <div className={styles.form}>
                        <div className={styles.tabs}>
                            <button className={`${styles.tab} ${styles.active}`}>Войти</button>
                            <button className={styles.tab}>Зарегистрироваться</button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="login">Логин или номер телефона:</label>
                            <input
                                id="login"
                                type="text"
                                value={loginInput}
                                onChange={(e) => setLoginInput(e.target.value)}
                            />

                            <label htmlFor="password">Пароль:</label>
                            <input
                                id="password"
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                            />

                            {error && <p className={styles.error}>{error}</p>}

                            <button type="submit" disabled={!loginInput || !passwordInput} className={styles.loginBtn}>Войти</button>

                            <a href="#" className={styles.restore}>Восстановить пароль</a>

                            <div className={styles.socials}>
                                <span>Войти через:</span>
                                <div className={styles.socialIcons}>
                                    <a href="#" aria-label="Google"><img src="/images/AuthPage/google-icon.svg" alt="Google" /></a>
                                    <a href="#" aria-label="Facebook"><img src="/images/AuthPage/facebook-icon.svg" alt="Facebook" /></a>
                                    <a href="#" aria-label="Yandex"><img src="/images/AuthPage/yandex-icon.svg" alt="Yandex" /></a>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default AuthPage