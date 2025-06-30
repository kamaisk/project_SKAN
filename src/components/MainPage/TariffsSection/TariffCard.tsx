import styles from "./TariffCard.module.scss";

type TariffCardProps = {
    title: string;
    subtitle: string;
    price: string;
    oldPrice: string;
    installmentText?: string;
    features: string[];
    buttonText: string;
    color: string;
    isCurrent?: boolean;
};

export const TariffCard: React.FC<TariffCardProps> = ({ title, subtitle, price,
    oldPrice, installmentText, features, buttonText, color, isCurrent = false
}) => {
    const isCurrentTariff = isCurrent && buttonText === "Перейти в личный кабинет";
    const cardClass = `${styles.card} ${styles[color]}`;
    const headerClass = `${styles.header} ${styles[color]}`;
    const buttonClass = isCurrentTariff ? styles.currentBtn : styles.default;

    return (
        <div className={cardClass}>
            <div className={headerClass}>
                <h3 className={styles.title}>{title}</h3>
                <p>{subtitle}</p>
            </div>

            <div className={styles.content}>
                <div className={styles.mainContent}>
                    {isCurrent && <div className={styles.current}>Текущий тариф</div>}

                    <div className={styles.priceBlock}>
                        <span className={styles.price}>{price}</span>
                        <span className={styles.oldPrice}>{oldPrice}</span>
                        {installmentText && (
                            <div className={styles.installment}>{installmentText}</div>
                        )}
                    </div>

                    <div className={styles.featuresBlock}>
                        <p className={styles.title}>В тариф входит:</p>
                        <ul className={styles.features}>
                            {features.map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <button className={`${styles.button} ${buttonClass}`}>{buttonText}</button>

            </div>
        </div>
    )
}


