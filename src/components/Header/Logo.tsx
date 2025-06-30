import styles from "./Header.module.scss"

const Logo: React.FC = () => {
    return (
        <div className={styles.header__logo}>
            <img src="/images/header-logo.svg" alt="Логотип СКАН" />
        </div>
    )
}

export default Logo;