import { createApiRequest } from "../utils/apiRequest";

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

interface SearchRequest {
    intervalType: "day" | "week" | "month" | "quarter" | "year";
    histogramTypes: ("totalDocuments" | "riskFactors")[];
    issueDateInterval: {
        startDate: string;
        endDate: string;
    };
    searchContext: {
        targetSearchEntitiesContext: TargetSearchEntitiesContext;
    };
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

export interface SearchResultItem {
    encodedId: string;
    influence: number;
    similarCount: number;
}

interface SearchResponse {
    items: SearchResultItem[];
}

export const ObjectSearch = async (body: SearchRequest, accessToken: string) => {
    return createApiRequest<SearchResponse>("/objectsearch", "POST", accessToken, body)
}