import HeroSection from "../../components/MainPage/HeroSection/HeroSection";
import TariffSection from "../../components/MainPage/TariffsSection/TariffSection";
import WhyWeSection from "../../components/MainPage/WhyWeSection/WhyWeSection";
import styles from "./HomePage.module.scss";

export const HomePage: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <main className={styles.main}>
            <HeroSection isAuthenticated={isAuthenticated} />
            <WhyWeSection />

            <div className={styles.imageWrapper}>
                <img src="/images/MainPage/promo-image.svg" alt="Промо изображение" />
            </div>

            <TariffSection />
        </main>
    )
}