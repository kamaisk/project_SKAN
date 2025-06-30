import { useNavigate } from "react-router-dom";
import styles from "./HeroSection.module.scss";

interface Props {
    isAuthenticated: boolean;
}

const HeroSection: React.FC<Props> = ({ isAuthenticated }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/search")
    };

    return (
        <section className={styles.hero}>
            <div className={styles.left}>
                <h1>Cервис по поиску публикаций о компании по его ИНН</h1>
                <p>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>

                {isAuthenticated && (<button className={styles.ctaBtn} onClick={handleClick}>Запросить данные</button>)}
            </div>

            <div className={styles.right}>
                <img src="/images/MainPage/hero-img.svg" alt="Иллюстрация сервиса" />
            </div>
        </section>
    )
}

export default HeroSection

