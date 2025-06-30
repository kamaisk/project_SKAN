import { useState } from "react";
import SearchForm, { type SearchFormData } from "./SearchForm";
import styles from "./SearchPage.module.scss";
import SearchResults from "./SearchResults";

const SearchPage: React.FC = () => {
    const [showResults, setShowResults] = useState(false);
    const [searchParams, setSearchParams] = useState<SearchFormData | null>(null);

    const handleSearchSubmit = (formData: SearchFormData) => {
        setSearchParams(formData);
        setShowResults(true)
    }

    return (
        <section className={styles.searchSection}>
            {!showResults ? (
                <>
                    <div className={styles.left}>
                        <h1 className={styles.title}>Найдите необходимые данные в пару кликов.</h1>
                        <p className={styles.subtitle}>Задайте параметры поиска. <br /> Чем больше заполните, тем точнее поиск</p>
                        <SearchForm onSearchSubmit={handleSearchSubmit} />
                    </div>

                    <div className={styles.right}>
                        <img className={styles.documentImg} src="/images/SearchPage/document-img.svg" alt="Картинка документа" />
                        <img className={styles.foldersImg} src="/images/SearchPage/folders-img.svg" alt="Картинки папок" />
                        <img className={styles.rocketImg} src="/images/SearchPage/rocket-img.svg" alt="Картинка ракеты" />
                    </div>
                </>
            ) : (
                searchParams && <SearchResults formData={searchParams} />
            )}
        </section>
    )
}
export default SearchPage