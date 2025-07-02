import styles from "./Header.module.scss"

const NavLinks: React.FC = () => {
    return (
        <nav className={styles.header__nav}>
            <a href="/">Главная</a>
            <a href="#">Тарифы</a>
            <a href="#">FAQ</a>
        </nav>
    )
}

export default NavLinks
