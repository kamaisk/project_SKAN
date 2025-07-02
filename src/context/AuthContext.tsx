import { createContext, useContext, useState, type ReactNode } from "react";

interface UserInfo {
    name: string;
    avatar: string;
    usedCompanyCount: number;
    companyLimit: number;
}

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string, user: UserInfo) => void;
    logout: () => void;
    token: string | null;
    user: UserInfo | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const [user, setUser] = useState<UserInfo | null>(() => {
        try {
            const savedUser = localStorage.getItem("user");
            return savedUser ? JSON.parse(savedUser) as UserInfo : null;
        } catch {
            return null;
        }
    })

    const login = (newToken: string, userData: UserInfo) => {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, login, logout, token, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}