import styles from "./Header.module.scss"
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import CompanyLimitPanel from "./CompanyLimitPanel";
import AuthPanel from "./AuthPanel";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <Logo />
            <NavLinks />

            <div className={styles.header__right}>
                {isAuthenticated && user ? (
                    <>
                        <CompanyLimitPanel
                            loading={false}
                            data={{ limit: user.companyLimit, used: user.usedCompanyCount }}
                        />
                        <AuthPanel
                            isAuthenticated={true}
                            user={user ?? undefined}
                            onLogout={logout}
                        />
                    </>
                ) : (
                    <AuthPanel isAuthenticated={false} onLogin={() => navigate("/login")} />
                )}
            </div>
        </header>
    )
}

export default Header