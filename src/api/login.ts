export const BASE_URL = "https://gateway.scan-interfax.ru/api/v1";

//Запрос для авторизации пользователя.
export interface LoginRequest {
    login: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    expire: string;
}

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${BASE_URL}/account/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error("Ошибка авторизации. Проверьте логин и пароль")
    }

    return response.json();
}

