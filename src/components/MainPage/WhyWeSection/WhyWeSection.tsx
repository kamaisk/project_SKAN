import { useState } from "react";
import styles from "./WhyWeSection.module.scss";
import arrowLeft from "/images/MainPage/WhyWeSection/arrow-left.svg";
import arrowRight from "/images/MainPage/WhyWeSection/arrow-right.svg";

interface CardProps {
    text: string;
    icon: string;
}

const cards: CardProps[] = [
    {
        text: "1. Высокая и оперативная скорость обработки заявки",
        icon: "/images/MainPage/WhyWeSection/icon1.svg",
    },
    {
        text: "2. Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
        icon: "/images/MainPage/WhyWeSection/icon2.svg",
    },
    {
        text: "3. Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
        icon: "/images/MainPage/WhyWeSection/icon3.svg",
    },
    {
        text: "4. Высокая и оперативная скорость обработки заявки",
        icon: "/images/MainPage/WhyWeSection/icon1.svg",
    },
    {
        text: "5. Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
        icon: "/images/MainPage/WhyWeSection/icon2.svg",
    },
    {
        text: "6. Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
        icon: "/images/MainPage/WhyWeSection/icon3.svg",
    }
];

const VISIBLE_CARDS = 3;

const WhyWeSection: React.FC = () => {
    const [startIndex, setStartIndex] = useState(0);

    const handlePrev = () => {
        setStartIndex((prev) => (prev === 0 ? cards.length - VISIBLE_CARDS : prev - 1));
    }

    const handleNext = () => {
        setStartIndex((prev) => (prev + VISIBLE_CARDS >= cards.length ? 0 : prev + 1));
    }

    const visibleCards = cards.slice(startIndex, startIndex + VISIBLE_CARDS);

    while (visibleCards.length < VISIBLE_CARDS) {
        visibleCards.push(cards[visibleCards.length])
    }

    return (
        <section className={styles.whyWe}>
            <h2>Почему именно мы</h2>

            <div className={styles.carousel}>
                <button onClick={handlePrev} className={styles.arrow}>
                    <img src={arrowLeft} alt="Назад" />
                </button>

                <div className={styles.cardsContainer}>
                    {visibleCards.map((card, index) => (
                        <div key={index} className={styles.card}>
                            <img src={card.icon} alt="Иконка Почему именно мы" />
                            <p>{card.text}</p>
                        </div>
                    ))}
                </div>

                <button onClick={handleNext} className={styles.arrow}>
                    <img src={arrowRight} alt="Вперед" />
                </button>
            </div>

        </section>
    )
}

export default WhyWeSection