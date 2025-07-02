import { BASE_URL } from "./login";

// Запрос для получения сводки по количеству публикаций на конкретные даты.
interface TargetSearchEntity {
    type: "company" | "suggestedPersons";
    sparkId: number | null;
    entityId: number | null;
    inn: string;
    maxFullness: boolean;
    inBusinessNews: boolean | null;
}

interface TargetSearchEntitiesContext {
    targetSearchEntities: TargetSearchEntity[];
    onlyMainRole: boolean;
    onlyWithRiskFactors: boolean;
    tonality: "any" | "negative" | "positive";
}

interface HistogramRequest {
    intervalType: "day" | "week" | "month" | "quarter" | "year";
    histogramTypes: ("totalDocuments" | "riskFactors")[];
    issueDateInterval: {
        startDate: string;
        endDate: string;
    };
    searchContext: {
        targetSearchEntitiesContext: TargetSearchEntitiesContext;
    }
    similarMode: "none" | "duplicates";
    limit: number;
    sortType: "issueDate" | "sourceInfluence";
    sortDirectionType: "desc" | "asc";
    attributeFilters: {
        excludeTechNews: boolean;
        excludeAnnouncements: boolean;
        excludeDigests: boolean;
    };
}

interface IntervalPoint {
    date: string;
    value: number;
}

export interface HistogramData {
    data: IntervalPoint[];
    histogramType: "totalDocuments" | "riskFactors";
}

export const getHistogramData = async (body: HistogramRequest, accessToken: string): Promise<HistogramData[]> => {
    const response = await fetch(`${BASE_URL}/objectsearch/histograms`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error("Ошибка при получении сводки публикаций");
    }

    const json = await response.json();

    if (!Array.isArray(json.data)) {
        throw new Error("Некорректный формат данных");
    }

    return json.data;
}