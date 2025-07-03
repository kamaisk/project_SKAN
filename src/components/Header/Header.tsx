import styles from "./Header.module.scss"
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import CompanyLimitPanel from "./CompanyLimitPanel";
import AuthPanel from "./AuthPanel";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header: React.FC = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(prev => !prev);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={styles.header}>
            <Logo />
            <NavLinks />

            {/* {isAuthenticated && user && (
                <div className={styles.headerMobile}>
                    <CompanyLimitPanel loading={false} data={{ limit: user.companyLimit, used: user.usedCompanyCount }} />
                </div>
            )} */}

            <div className={styles.header__right}>
                <button aria-label="Открыть меню" className={styles.burgerBtn} onClick={toggleMenu}>
                    <span className={isMenuOpen ? styles.burgerBtn__line_active : styles.burgerBtn__line}></span>
                    <span className={isMenuOpen ? styles.burgerBtn__line_active : styles.burgerBtn__line}></span>
                    <span className={isMenuOpen ? styles.burgerBtn__line_active : styles.burgerBtn__line}></span>
                </button>

                {isAuthenticated && user ? (
                    <>
                        <CompanyLimitPanel
                            loading={false}
                            data={{ limit: user.companyLimit, used: user.usedCompanyCount }}
                        />
                        <AuthPanel
                            isAuthenticated={true}
                            user={user ?? undefined}
                            onLogout={() => {
                                logout();
                                closeMenu();
                            }}
                        />
                    </>
                ) : (
                    <AuthPanel isAuthenticated={false} onLogin={() => {
                        navigate("/login");
                        closeMenu();
                    }}
                    />
                )}
            </div>

            {isMenuOpen && (
                <div className={styles.mobileMenuOverlay} onClick={closeMenu}>
                    <div className={styles.mobileMenu} onClick={e => e.stopPropagation()}>
                        <NavLinks />

                        {isAuthenticated && user ? (
                            <>
                                <AuthPanel
                                    isAuthenticated={true}
                                    user={user ?? undefined}
                                    onLogout={() => {
                                        logout();
                                        closeMenu();
                                    }}
                                />
                            </>
                        ) : (
                            <AuthPanel isAuthenticated={false} onLogin={() => {
                                navigate("/login");
                                closeMenu();
                            }}
                            />
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header