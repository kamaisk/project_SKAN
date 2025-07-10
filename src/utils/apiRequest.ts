import { BASE_URL } from "../config";

export const createApiRequest = async <T>(
    url: string,
    method: string,
    accessToken: string,
    body?: unknown
): Promise<T> => {
    const response = await fetch(`${BASE_URL}${url}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
        throw new Error(`Ошибка при запросе ${url}`);
    }
    return response.json();
};