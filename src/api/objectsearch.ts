import { BASE_URL } from "./login";

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

export const ObjectSearch = async (body: SearchRequest, accessToken: string): Promise<SearchResponse> => {
    const response = await fetch(`${BASE_URL}/objectsearch`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error("Ошибка при поиске публикаций");
    }

    return response.json();
}