import React, { useEffect, useState } from "react";
import styles from "./SearchForm.module.scss";
import { validateDateRange } from "../../utils/validators";

export interface SearchFormData {
    inn: string;
    tonality: string;
    documentCount: string;
    startDate: string;
    endDate: string;
    maxFullness: boolean;
    businessContext: boolean;
    mainRole: boolean;
    riskFactors: boolean;
    techNews: boolean;
    announcements: boolean;
    digests: boolean;
}

interface Props {
    onSearchSubmit: (formData: SearchFormData) => void;
}

const initialForm: SearchFormData = {
    inn: "",
    tonality: "",
    documentCount: "",
    startDate: "",
    endDate: "",
    maxFullness: false,
    businessContext: false,
    mainRole: false,
    riskFactors: false,
    techNews: false,
    announcements: false,
    digests: false,
};

const SearchForm: React.FC<Props> = React.memo(({ onSearchSubmit }) => {
    const [searchFormData, setSearchFormData] = useState<SearchFormData>(initialForm);
    const [errors, setErrors] = useState({
        inn: "",
        documentCount: "",
        dates: "",
    });
    const [isValid, setIsValid] = useState(false);
    const [touched, setTouched] = useState({
        inn: false,
        documentCount: false,
        startDate: false,
        endDate: false,
    })

    useEffect(() => {
        const newErrors = {
            inn: "",
            documentCount: "",
            dates: "",
        };

        //проверка ИНН
        if (!/^\d{10}$/.test(searchFormData.inn)) {
            newErrors.inn = "Введите корректные данные"
        }

        //проверка количества документов
        const num = Number(searchFormData.documentCount);
        if (!num || num < 1 || num > 1000) {
            newErrors.documentCount = "Введите от 1 до 1000"
        }

        //проверка дат
        newErrors.dates = validateDateRange(searchFormData.startDate, searchFormData.endDate) || "";

        setErrors(newErrors);

        const noErrors = !newErrors.inn && !newErrors.documentCount && !newErrors.dates;
        const allRequiredFilled = searchFormData.inn && searchFormData.tonality && searchFormData.documentCount && searchFormData.startDate && searchFormData.endDate;
        setIsValid(noErrors && Boolean(allRequiredFilled));
    }, [searchFormData])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;
        setSearchFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (event.target as HTMLInputElement).checked : value
        }))
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValid) {
            onSearchSubmit(searchFormData);
        }
        console.log("Запрос отправлен с данными:", searchFormData)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.leftBlock}>

                <div className={styles.inputBlock}>
                    <label htmlFor="inn">
                        ИНН компании <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        id="inn"
                        name="inn"
                        placeholder="10 цифр"
                        value={searchFormData.inn}
                        onChange={handleChange}
                        onBlur={() => setTouched(prev => ({ ...prev, inn: true }))}
                        className={errors.inn && touched.inn ? styles.inputError : ""}
                    />
                    {errors.inn && touched.inn && <span className={styles.errorText}>{errors.inn}</span>}
                </div>

                <div className={styles.inputBlock}>
                    <label htmlFor="tonality">
                        Тональность <span className={styles.required}>*</span>
                    </label>
                    <select
                        id="tonality"
                        name="tonality"
                        value={searchFormData.tonality}
                        onChange={handleChange}
                    >
                        <option value="">Выберите тональность</option>
                        <option value="any">Любая</option>
                        <option value="positive">Позитивная</option>
                        <option value="negative">Негативная</option>
                    </select>
                </div>

                <div className={styles.inputBlock}>
                    <label htmlFor="documentCount">
                        Количество документов в выдаче <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="number"
                        id="documentCount"
                        name="documentCount"
                        placeholder="от 1 до 1000"
                        value={searchFormData.documentCount}
                        onChange={handleChange}
                        onBlur={() => setTouched(prev => ({ ...prev, documentCount: true }))}
                        className={errors.documentCount && touched.documentCount ? styles.inputError : ""}
                    />
                    {errors.documentCount && touched.documentCount && <span className={styles.errorText}>{errors.documentCount}</span>}
                </div>

                <div className={styles.dateBlock}>
                    <div className={styles.inputBlock}>
                        <div className={styles.dateField}>
                            <label htmlFor="startDate">
                                Диапазон поиска <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                placeholder="Дата начала"
                                value={searchFormData.startDate}
                                onChange={handleChange}
                                onBlur={() => setTouched(prev => ({ ...prev, startDate: true }))}
                                className={errors.dates && touched.startDate ? styles.inputError : ""}
                            />
                        </div>
                    </div>

                    <div className={styles.inputBlock}>
                        <div className={styles.dateField}>
                            <label htmlFor="endDate">&nbsp;<span className={styles.required}></span></label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                placeholder="Дата конца"
                                value={searchFormData.endDate}
                                onChange={handleChange}
                                onBlur={() => setTouched(prev => ({ ...prev, endDate: true }))}
                                className={errors.dates && touched.endDate ? styles.inputError : ""}
                            />
                        </div>
                    </div>
                    {errors.dates && (touched.startDate || touched.endDate) && <span className={styles.errorText}>{errors.dates}</span>}
                </div>
            </div>

            <div className={styles.rightBlock}>
                <label className={`${styles.checkbox} ${!searchFormData.maxFullness ? styles.inactive : ""}`}>
                    <input
                        type="checkbox"
                        name="maxFullness"
                        checked={searchFormData.maxFullness}
                        onChange={handleChange}
                    />
                    Признак максимальной полноты
                </label>

                <label className={`${styles.checkbox} ${!searchFormData.businessContext ? styles.inactive : ""}`}>
                    <input
                        type="checkbox"
                        name="businessContext"
                        checked={searchFormData.businessContext}
                        onChange={handleChange}
                    />
                    Упоминания в бизнес-контексте
                </label>

                <label className={`${styles.checkbox} ${!searchFormData.mainRole ? styles.inactive : ""}`}>
                    <input
                        type="checkbox"
                        name="mainRole"
                        checked={searchFormData.mainRole}
                        onChange={handleChange}
                    />
                    Главная роль в публикации
                </label>

                <label className={`${styles.checkbox} ${!searchFormData.riskFactors ? styles.inactive : ""}`}>
                    <input
                        type="checkbox"
                        name="riskFactors"
                        checked={searchFormData.riskFactors}
                        onChange={handleChange}
                    />
                    Публикации только с риск-факторами
                </label>

                <label className={`${styles.checkbox} ${!searchFormData.techNews ? styles.inactive : ""}`}>
                    <input
                        type="checkbox"
                        name="techNews"
                        checked={searchFormData.techNews}
                        onChange={handleChange}
                    />
                    Включать технические новости рынков
                </label>

                <label className={`${styles.checkbox} ${!searchFormData.announcements ? styles.inactive : ""}`}>
                    <input
                        type="checkbox"
                        name="announcements"
                        checked={searchFormData.announcements}
                        onChange={handleChange}
                    />
                    Включать анонсы и календари
                </label>

                <label className={`${styles.checkbox} ${!searchFormData.digests ? styles.inactive : ""}`}>
                    <input
                        type="checkbox"
                        name="digests"
                        checked={searchFormData.digests}
                        onChange={handleChange}
                    />
                    Включать сводки новостей
                </label>

            </div>

            <div className={styles.searchBtnBlock}>
                <button className={styles.searchBtn} type="submit" disabled={!isValid}>
                    Поиск
                </button>
                <p className={styles.note}>* Обязательные к заполнению поля</p>
            </div>
        </form>
    )
});

export default SearchForm