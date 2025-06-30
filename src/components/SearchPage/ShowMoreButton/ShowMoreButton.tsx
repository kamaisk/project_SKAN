import styles from "./ShowMoreButton.module.scss";

interface ShowMoreButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({ onClick, disabled }) => {
    return (
        <div className={styles.btnWrapper}>
            <button
                type="button"
                className={styles.showMoreBtn}
                onClick={onClick}
                disabled={disabled}
            >
                Показать больше
            </button>
        </div>
    )
}

export default ShowMoreButton