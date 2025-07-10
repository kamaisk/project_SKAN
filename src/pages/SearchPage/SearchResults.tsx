import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import HistogramCarousel from "../../components/SearchPage/HistogramCarousel/HistogramCarousel";
import PublicationCard from "../../components/SearchPage/PublicationCard/PublicationCard";
import styles from "./SearchResults.module.scss";
import ShowMoreButton from "../../components/SearchPage/ShowMoreButton/ShowMoreButton";
import type { SearchFormData } from "./SearchForm";
import { useAuth } from "../../context/AuthContext";
import { getHistogramData, type HistogramData, type HistogramRequest } from "../../api/histograms";
import { ObjectSearch } from "../../api/objectsearch";
import { getDocumentByIds, type DocumentOk } from "../../api/documents";

interface Props {
    formData: SearchFormData;
}

const SearchResults: React.FC<Props> = React.memo(({ formData }) => {
    const { token } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [histogramData, setHistogramData] = useState<HistogramData[] | null>(null);
    const [publications, setPublications] = useState<DocumentOk[]>([]);
    const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {
        const fetchHistogramAndDocuments = async () => {
            try {
                if (!token) return;

                const requestBody: HistogramRequest = {
                    intervalType: "month",
                    histogramTypes: ["totalDocuments", "riskFactors"],
                    issueDateInterval: {
                        startDate: formData.startDate,
                        endDate: formData.endDate,
                    },
                    searchContext: {
                        targetSearchEntitiesContext: {
                            targetSearchEntities: [
                                {
                                    type: "company",
                                    sparkId: null,
                                    entityId: null,
                                    inn: formData.inn,
                                    maxFullness: formData.maxFullness,
                                    inBusinessNews: formData.businessContext || null,
                                }
                            ],
                            onlyMainRole: formData.mainRole,
                            onlyWithRiskFactors: formData.riskFactors,
                            tonality: formData.tonality as "any" | "negative" | "positive",
                        }
                    },
                    similarMode: "duplicates",
                    limit: Number(formData.documentCount),
                    sortType: "sourceInfluence",
                    sortDirectionType: "desc",
                    attributeFilters: {
                        excludeTechNews: !formData.techNews,
                        excludeAnnouncements: !formData.announcements,
                        excludeDigests: !formData.digests,
                    },
                };

                const histogramData = await getHistogramData(requestBody, token);
                console.log("Данные по гистограмме", histogramData);
                setHistogramData(histogramData.data);

                const idResponse = await ObjectSearch(requestBody, token);
                const ids = idResponse.items.map((item) => item.encodedId);
                console.log("Найдено ID публикаций", ids);

                if (ids.length === 0) {
                    setPublications([]);
                    return;
                }

                const limitedIds = ids.slice(0, 100);
                const docs = await getDocumentByIds(limitedIds, token);
                console.log("Сами документы", docs);

                const okDocs = docs
                    .filter((doc): doc is { ok: DocumentOk } => "ok" in doc)
                    .map((doc) => doc.ok);
                setPublications(okDocs);

            } catch (error) {
                console.error("Ошибка при получении данных", error);
                setError("Не удалось загрузить данные. Попробуйте позже");
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
            ) : error ? (
                <p className={styles.error}>{error}</p>
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
            )
            }
        </div >
    )
});

export default SearchResults;