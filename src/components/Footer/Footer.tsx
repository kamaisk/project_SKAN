import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <img src="/images/footer-logo.svg" alt="Логотип СКАН" />

            <div className={styles.right}>
                <p>г. Москва, Цветной б-р, 40 </p>
                <p>+7 495 771 21 11</p>
                <p> info@skan.ru</p>
                <p className={styles.copyrightText}>Copyright. 2022</p>
            </div>
        </footer>
    )
}

export default Footer
