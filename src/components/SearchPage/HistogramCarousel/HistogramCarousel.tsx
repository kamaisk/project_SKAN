import { useMemo, useState } from "react";
import styles from "./HistogramCarousel.module.scss";
import type { HistogramData } from "../../../api/histograms";

interface HistogramItem {
    date: string;
    total: number;
    risks: number;
}

interface Props {
    data: HistogramData[] | null;
}

const HistogramCarousel: React.FC<Props> = ({ data }) => {
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 8;
    const endIndex = startIndex + visibleCount;

    const combinedData: HistogramItem[] = useMemo(() => {
        if (!data) return [];

        const totalMap = new Map<string, number>();
        const risksMap = new Map<string, number>();

        data.forEach((item) => {
            if (item.histogramType === "totalDocuments") {
                item.data.forEach((d) => totalMap.set(d.date, d.value));
            } else if (item.histogramType === "riskFactors") {
                item.data.forEach((d) => risksMap.set(d.date, d.value));
            }
        })

        const allDates = Array.from(new Set([...totalMap.keys(), ...risksMap.keys()])).sort();
        return allDates.map((date) => ({
            date: new Date(date).toLocaleDateString("ru-RU", {
                month: "2-digit",
                year: "numeric",
            }),
            total: totalMap.get(date) || 0,
            risks: risksMap.get(date) || 0,
        }));
    }, [data]);

    if (!Array.isArray(data) || combinedData.length === 0) return null;

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(0, prev - 1))
    }

    const handleNext = () => {
        setStartIndex((prev) => Math.min(combinedData.length - visibleCount, prev + 1))
    }

    const visibleItems = combinedData.slice(startIndex, endIndex);

    return (
        <div className={styles.carouselWrapper}>
            <h2 className={styles.title}>Общая сводка</h2>
            <p className={styles.subtitle}>Найдено {combinedData.length} вариантов</p>

            <div className={styles.carousel}>
                <button className={styles.navBtn} onClick={handlePrev} disabled={startIndex === 0}>
                    <img src="/images/MainPage/WhyWeSection/arrow-left.svg" alt="Назад" />
                </button>

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

                <button className={styles.navBtn} onClick={handleNext} disabled={endIndex >= combinedData.length}>
                    <img src="/images/MainPage/WhyWeSection/arrow-right.svg" alt="Вперед" />
                </button>
            </div>
        </div>
    )
}

export default HistogramCarousel