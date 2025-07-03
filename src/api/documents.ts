import { BASE_URL } from "./login";

// interface DocumentRequest {
//     ids: string[];
// }

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

export const getDocumentByIds = async (ids: string[], accessToken: string): Promise<DocumentResponseItem[]> => {
    const response = await fetch(`${BASE_URL}/documents`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
        throw new Error("Ошибка при получении документов");
    }

    return await response.json();

}