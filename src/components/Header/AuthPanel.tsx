import styles from "./Header.module.scss"

interface AuthPanelProps {
    isAuthenticated: boolean;
    user?: { name: string, avatar: string };
    onLogin?: () => void;
    onLogout?: () => void;
}

const AuthPanel: React.FC<AuthPanelProps> = ({ isAuthenticated, user, onLogin, onLogout }) => {
    if (isAuthenticated && user) {
        return (
            <div className={styles.auth__logout}>
                <div className={styles.auth__username}>
                    {user.name}
                </div>
                <img src={user.avatar} alt="Фото пользователя" className={styles.auth__avatar} />
                <button className={styles.auth__logoutBtn} onClick={onLogout}>
                    Выйти
                </button>
            </div>
        )
    }

    return (
        <div className={styles.auth}>
            <a href="#" className={styles.transparentText}>Зарегистрироваться</a>
            <div className={styles.auth__divider}></div>
            <button className={styles.auth__login} onClick={onLogin}>Войти</button>
        </div>
    )
}

export default AuthPanel