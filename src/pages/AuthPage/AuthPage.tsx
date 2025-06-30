import styles from "./AuthPage.module.scss";

const AuthPage: React.FC = () => {
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

                        <form>
                            <label htmlFor="login">Логин или номер телефона:</label>
                            <input id="login" type="text" />

                            <label htmlFor="password">Пароль:</label>
                            <input id="password" type="password" />

                            <button type="submit" disabled className={styles.loginBtn}>Войти</button>

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