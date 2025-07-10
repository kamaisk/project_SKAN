import { createApiRequest } from "../utils/apiRequest";

//Запрос для получения информации об аккаунте пользователя.
interface UserInfo {
    eventFiltersInfo: {
        usedCompanyCount: number;
        companyLimit: number;
    };
}

export const getUserInfo = async (accessToken: string) => {
    return createApiRequest<UserInfo>("/account/info", "GET", accessToken);
}