import styles from "./TariffSection.module.scss";
import { TariffCard } from "./TariffCard";

const isAuth = true;
const currentTariffTitle = "Beginner";

const tariffs = [
    {
        title: "Beginner",
        subtitle: "Для небольшого исследования",
        price: "799 ₽",
        oldPrice: "1 200 ₽",
        installmentText: "или 150 ₽/мес. при рассрочке на 24 мес.",
        features: [
            "Безлимитная история запросов",
            "Безопасная сделка",
            "Поддержка 24/7"
        ],
        color: "orange",
    },
    {
        title: "Pro",
        subtitle: "Для HR и фрилансеров",
        price: "1 299 ₽",
        oldPrice: "2 600 ₽",
        installmentText: "или 279 ₽/мес. при рассрочке на 24 мес.",
        features: [
            "Все пункты тарифа Beginner",
            "Экспорт истории",
            "Рекомендации по приоритетам"
        ],
        color: "blue",
    },
    {
        title: "Business",
        subtitle: "Для корпоративных клиентов",
        price: "2 379 ₽",
        oldPrice: "3 700 ₽",
        features: [
            "Все пункты тарифа Pro",
            "Безлимитное количество запросов",
            "Приоритетная поддержка"
        ],
        color: "black",
    }
];

const TariffSection: React.FC = () => {
    return (
        <section className={styles.tariffs}>
            <h2 className={styles.title}>наши тарифы</h2>

            <div className={styles.cardContainer}>
                {tariffs.map((tariff, index) => {
                    const isCurrent = isAuth && tariff.title === currentTariffTitle;
                    const buttonText = isCurrent && isAuth ? "Перейти в личный кабинет" : "Подробнее";

                    return (
                        <TariffCard
                            key={index}
                            {...tariff}
                            isCurrent={isCurrent}
                            buttonText={buttonText}
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default TariffSection