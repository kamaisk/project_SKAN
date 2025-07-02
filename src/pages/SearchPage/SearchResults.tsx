import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import HistogramCarousel from "../../components/SearchPage/HistogramCarousel/HistogramCarousel";
import PublicationCard from "../../components/SearchPage/PublicationCard/PublicationCard";
import styles from "./SearchResults.module.scss";
import ShowMoreButton from "../../components/SearchPage/ShowMoreButton/ShowMoreButton";
import type { SearchFormData } from "./SearchForm";
import { useAuth } from "../../context/AuthContext";
import { getHistogramData, type HistogramData } from "../../api/histograms";
import { ObjectSearch } from "../../api/objectsearch";

interface Props {
    formData: SearchFormData;
}

const SearchResults: React.FC<Props> = ({ formData }) => {
    const { token } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [histogramData, setHistogramData] = useState<HistogramData[] | null>(null);
    const [visibleCount, setVisibleCount] = useState(10);

    const totalPublications = 20;
    const publications = Array.from({ length: totalPublications }, (_, i) => ({
        id: `pub-${i}`,
        date: new Date().toISOString(),
        source: "Комсомольская правда KP.RU",
        sourceLink: "https://kp.ru",
        title: `Скиллфэктори - лучшая онлайн-школа для будущих айтишников №${i + 1} по ИНН ${formData.inn}`,
        content: "SkillFactory — школа для всех, кто хочет изменить свою карьеру и жизнь. С 2016 года обучение прошли 20 000+ человек из 40 стран с 4 континентов, самому взрослому студенту сейчас 86 лет. Выпускники работают в Сбере, Cisco, Bayer, Nvidia, МТС, Ростелекоме, Mail.ru, Яндексе, Ozon и других топовых компаниях.Принципы SkillFactory: акцент на практике, забота о студентах и ориентир на трудоустройство. 80% обучения — выполнение упражнений и реальных проектов. Каждого студента поддерживают менторы, 2 саппорт-линии и комьюнити курса. А карьерный центр помогает составить резюме, подготовиться к собеседованиям и познакомиться с IT-рекрутерами.",
        attributes: {
            isTechNews: i % 3 === 0,
            isAnnouncement: i % 3 === 1,
            isDigest: i % 3 === 2,
            wordCount: 250 + i * 3,
        },
    }));

    useEffect(() => {
        const fetchHistogramAndDocuments = async () => {
            try {
                if (!token) return;

                const requestBody = {
                    intervalType: "month" as const,
                    histogramTypes: ["totalDocuments", "riskFactors"] as ("totalDocuments" | "riskFactors")[],
                    issueDateInterval: {
                        startDate: formData.startDate,
                        endDate: formData.endDate,
                    },
                    searchContext: {
                        targetSearchEntities: [
                            {
                                type: "company" as const,
                                sparkId: null,
                                entityId: null,
                                inn: Number(formData.inn),
                                maxFullness: formData.maxFullness,
                                inBusinessNews: formData.businessContext || null,
                            }
                        ],
                        onlyMainRole: formData.mainRole,
                        onlyWithRiskFactors: formData.riskFactors,
                        tonality: formData.tonality as "any" | "negative" | "positive",
                    },
                    similarMode: "duplicates" as const,
                    limit: 1000,
                    sortType: "sourceInfluence" as const,
                    sortDirectionType: "desc" as const,
                    attributeFilters: {
                        excludeTechNews: !formData.techNews,
                        excludeAnnouncements: !formData.announcements,
                        excludeDigests: !formData.digests,
                    },
                };

                const histogramData = await getHistogramData(requestBody, token);
                console.log("Histogram API response", histogramData);
                setHistogramData(histogramData);

                const documentIdsResponse = await ObjectSearch(requestBody, token);
                console.log("Найдено ID публикаций", documentIdsResponse.items);
            } catch (error) {
                console.error("Ошибка получения гистограммы", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistogramAndDocuments();
    }, [formData, token]);

    const visiblePublications = publications.slice(0, visibleCount);

    return (
        <div className={styles.resultsWrapper}>
            <div className={styles.topBlock}>
                <div className={styles.textWrapper}>
                    <h2 className={styles.title}>Ищем. Скоро будут результаты</h2>
                    <p className={styles.subtitle}>Поиск может занять некоторое время, <br /> просим сохранять терпение.</p>
                </div>
                <img className={styles.searchResultsImg} src="/images/SearchPage/SearchResults/woman-image.svg" alt="Поиск результатов" />
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <HistogramCarousel data={histogramData} />

                    <div className={styles.cardsWrapper}>
                        <h2 className={styles.titleDocs}>Список документов</h2>
                        <div className={styles.cardsGrid}>
                            {visiblePublications.map((item) => (
                                <PublicationCard key={item.id} publication={item} />
                            ))}
                        </div>
                    </div>

                    {visibleCount < publications.length && (
                        <ShowMoreButton onClick={() => setVisibleCount(visibleCount + 10)} />
                    )}
                </>
            )}
        </div>
    )
}

export default SearchResults;