import { createApiRequest } from "../utils/apiRequest";

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

export interface HistogramRequest {
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

interface HistogramApiResponse {
    data: HistogramData[];
}

export const getHistogramData = async (body: HistogramRequest, accessToken: string): Promise<HistogramApiResponse> => {
    return createApiRequest<HistogramApiResponse>("/objectsearch/histograms", "POST", accessToken, body);
}