import { useState } from "react";
import styles from "./HistogramCarousel.module.scss";

interface HistogramItem {
    date: string;
    total: number;
    risks: number;
}

const mockData: HistogramItem[] = [
    { date: "01.01.2024", total: 10, risks: 1 },
    { date: "02.01.2024", total: 20, risks: 20 },
    { date: "03.01.2024", total: 30, risks: 444 },
    { date: "04.01.2024", total: 40, risks: 643 },
    { date: "05.01.2024", total: 50, risks: 455 },
    { date: "06.01.2024", total: 60, risks: 98 },
    { date: "07.01.2024", total: 70, risks: 64 },
    { date: "08.01.2024", total: 80, risks: 267 },
    { date: "09.01.2024", total: 90, risks: 65 },
    { date: "10.01.2024", total: 100, risks: 38 },
]

interface Props {
    totalPublications: number;
}

const HistogramCarousel: React.FC<Props> = ({ totalPublications }) => {
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 8;
    const endIndex = startIndex + visibleCount;

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(0, prev - 1))
    }

    const handleNext = () => {
        setStartIndex((prev) => Math.min(mockData.length - visibleCount, prev + 1))
    }

    const visibleItems = mockData.slice(startIndex, endIndex);

    return (
        <div className={styles.carouselWrapper}>
            <h2 className={styles.title}>Общая сводка</h2>
            <p className={styles.subtitle}>Найдено {totalPublications} вариантов</p>

            <div className={styles.carousel}>
                <button className={styles.navBtn} onClick={handlePrev} disabled={startIndex === 0}>
                    <img src="/images/MainPage/WhyWeSection/arrow-left.svg" alt="Назад" />
                </button>

                {/* <div className={styles.items}>
                    {visibleItems.map((item, index) => (
                        <div key={index} className={styles.item}>
                            <p className={styles.date}>{item.date}</p>
                            <p className={styles.total}>Всего <strong>{item.total}</strong></p>
                            <p className={styles.risks}>Риски <strong>{item.risks}</strong></p>
                        </div>
                    ))}
                </div> */}

                <div className={styles.table}>
                    <div className={styles.row}>
                        <div className={styles.headerCell}>Период</div>
                        {visibleItems.map((item, index) => (
                            <div key={index} className={styles.cell}>
                                {item.date}
                            </div>
                        ))}
                    </div>

                    <div className={styles.row}>
                        <div className={styles.headerCell}>Всего</div>
                        {visibleItems.map((item, index) => (
                            <div key={index} className={styles.cell}>
                                {item.total}
                            </div>
                        ))}
                    </div>

                    <div className={styles.row}>
                        <div className={styles.headerCell}>Риски</div>
                        {visibleItems.map((item, index) => (
                            <div key={index} className={styles.cell}>
                                {item.risks}
                            </div>
                        ))}
                    </div>
                </div>

                <button className={styles.navBtn} onClick={handleNext} disabled={endIndex >= mockData.length}>
                    <img src="/images/MainPage/WhyWeSection/arrow-right.svg" alt="Вперед" />
                </button>
            </div>
        </div>
    )
}

export default HistogramCarousel