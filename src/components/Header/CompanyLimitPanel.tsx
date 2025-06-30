import styles from "./Header.module.scss"

interface CompanyLimitPanelProps {
    loading: boolean;
    data: { used: number; limit: number } | null;
}

const CompanyLimitPanel: React.FC<CompanyLimitPanelProps> = ({ loading, data }) => {
    return (
        <div className={styles.limitPanel}>
            {loading || !data ? (
                <div className={styles.limitPanel__loader}></div>
            ) : (
                <div>
                    <div>Использовано компаний <strong className={styles.limitPanel__black}>{data.used}</strong></div>
                    <div>Лимит по компаниям <span className={styles.limitPanel__green}>{data.limit}</span> </div>
                </div>
            )}
        </div>
    )
}

export default CompanyLimitPanel