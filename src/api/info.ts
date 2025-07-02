import { BASE_URL } from "./login";

//Запрос для получения информации об аккаунте пользователя.
interface UserInfo {
    eventFiltersInfo: {
        usedCompanyCount: number;
        companyLimit: number;
    };
}

export const getUserInfo = async (accessToken: string): Promise<UserInfo> => {
    const response = await fetch(`${BASE_URL}/account/info`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Ошибка при получении информации о пользователе")
    }

    return response.json();
}