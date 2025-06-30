import { useEffect, useState } from "react"
import styles from "./Header.module.scss"
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import CompanyLimitPanel from "./CompanyLimitPanel";
import AuthPanel from "./AuthPanel";

const Header: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [limitData, setLimitData] = useState<{ used: number; limit: number } | null>(null);
    const [loadingLimit, setLoadingLimit] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            setLoadingLimit(true);
            // имитация запроса
            setTimeout(() => {
                setLimitData({ used: 34, limit: 100 });
                setLoadingLimit(false)
            }, 3000)
        }
    }, [isAuthenticated]);

    return (
        <header className={styles.header}>
            <Logo />
            <NavLinks />

            <div className={styles.header__right}>
                {isAuthenticated ? (
                    <>
                        <CompanyLimitPanel loading={loadingLimit} data={limitData} />
                        <AuthPanel
                            isAuthenticated={true}
                            user={{ name: "Алексей А.", avatar: "/images/header-avatar.svg" }}
                            onLogout={() => {
                                setIsAuthenticated(false);
                                setLimitData(null)
                            }}
                        />
                    </>
                ) : (
                    <AuthPanel isAuthenticated={false} onLogin={() => setIsAuthenticated(true)} />
                )}
            </div>
        </header>
    )
}

export default Header