import { createApiRequest } from "../utils/apiRequest";

export interface DocumentOk {
    schemaVersion: string;
    id: string;
    version: number;
    issueDate: string;
    url: string;
    author?: {
        name: string;
    };
    source: {
        id: number;
        name: string;
        categoryId: number;
        levelId: number;
        groupId: number
    };
    dedupClusterId: string;
    title: {
        text: string;
        markup: string;
    };
    content: {
        markup: string;
    };
    attributes: {
        isTechNews: boolean;
        isAnnouncement: boolean;
        isDigest: boolean;
        wordCount: number;
    };
    language?: string;
}

interface DocumentFail {
    errorCode: string;
    errorMessage: string;
}

export type DocumentResponseItem =
    | { ok: DocumentOk }
    | { fail: DocumentFail };

export const getDocumentByIds = async (ids: string[], accessToken: string) => {
    return createApiRequest<DocumentResponseItem[]>("/documents", "POST", accessToken, { ids });
}