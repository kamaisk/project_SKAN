import React, { useEffect, useState } from "react";
import styles from "./SearchForm.module.scss";

export interface SearchFormData {
    inn: string;
    tonality: string;
    numberDocuments: string;
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
    numberDocuments: "",
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

const SearchForm: React.FC<Props> = ({ onSearchSubmit }) => {
    const [form, setForm] = useState<SearchFormData>(initialForm);
    const [errors, setErrors] = useState({
        inn: "",
        numberDocuments: "",
        dates: "",
    });
    const [isValid, setIsValid] = useState(false);
    const [touched, setTouched] = useState({
        inn: false,
        numberDocuments: false,
        startDate: false,
        endDate: false,
    })

    useEffect(() => {
        const newErrors = {
            inn: "",
            numberDocuments: "",
            dates: "",
        };

        //проверка ИНН
        if (!/^\d{10}$/.test(form.inn)) {
            newErrors.inn = "Введите корректные данные"
        }

        //проверка количества документов
        const num = Number(form.numberDocuments);
        if (!num || num < 1 || num > 1000) {
            newErrors.numberDocuments = "Введите от 1 до 1000"
        }

        //проверка дат
        const start = new Date(form.startDate);
        const end = new Date(form.endDate);
        const now = new Date();
        if (!form.startDate || !form.endDate || isNaN(start.getTime()) || isNaN(end.getTime())) {
            newErrors.dates = "Введите корректные диапазон дат";
        } else if (start > end) {
            newErrors.dates = "Дата начала не может быть позже даты конца";
        } else if (start > now || end > now) {
            newErrors.dates = "Даты не могут быть в будущем";
        }

        setErrors(newErrors);

        // const noErrors = Boolean(newErrors.inn === "" && newErrors.numberDocuments === "" && newErrors.dates === "");
        const noErrors = !newErrors.inn && !newErrors.numberDocuments && !newErrors.dates;
        const allRequiredFilled = form.inn && form.tonality && form.numberDocuments && form.startDate && form.endDate;
        setIsValid(noErrors && Boolean(allRequiredFilled));
    }, [form])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (event.target as HTMLInputElement).checked : value
        }))
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValid) {
            onSearchSubmit(form);
        }
        console.log("Запрос отправлен с данными:", form)
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
                        value={form.inn}
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
                        value={form.tonality}
                        onChange={handleChange}
                    >
                        <option value="">Выберите тональность</option>
                        <option value="any">Любая</option>
                        <option value="positive">Позитивная</option>
                        <option value="negative">Негативная</option>
                    </select>
                </div>

                <div className={styles.inputBlock}>
                    <label htmlFor="numberDocuments">
                        Количество документов в выдаче <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="number"
                        id="numberDocuments"
                        name="numberDocuments"
                        placeholder="от 1 до 1000"
                        value={form.numberDocuments}
                        onChange={handleChange}
                        onBlur={() => setTouched(prev => ({ ...prev, numberDocuments: true }))}
                        className={errors.numberDocuments && touched.numberDocuments ? styles.inputError : ""}
                    />
                    {errors.numberDocuments && touched.numberDocuments && <span className={styles.errorText}>{errors.numberDocuments}</span>}
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
                                value={form.startDate}
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
                                value={form.endDate}
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
                <label className={`${styles.checkbox} ${!form.maxFullness ? styles.inactive : ""}`}>
                    <input
                        type="checkbox"
                        name="maxFullness"
                        checked={form.maxFullness}
                        onChange={handleChange}
                    />
                    Признак максимальной полноты
                </label>

                <label className={`${styles.checkbox} ${!form.businessContext ? styles.inactive : ""}`}>
                    <input
                        type="checkbox"
                        name="businessContext"
                        checked={form.businessContext}
                        onChange={handleChange}
                    />
                    Упоминания в бизнес-контексте
                </label>

                <label className={`${styles.checkbox} ${!form.mainRole ? styles.inactive : ""}`}>
                    <input
                        type="checkbox"
                        name="mainRole"
                        checked={form.mainRole}
                        onChange={handleChange}
                    />
                    Главная роль в публикации
                </label>

                <label className={`${styles.checkbox} ${!form.riskFactors ? styles.inactive : ""}`}>
                    <input
                        type="checkbox"
                        name="riskFactors"
                        checked={form.riskFactors}
                        onChange={handleChange}
                    />
                    Публикации только с риск-факторами
                </label>

                <label className={`${styles.checkbox} ${!form.techNews ? styles.inactive : ""}`}>
                    <input
                        type="checkbox"
                        name="techNews"
                        checked={form.techNews}
                        onChange={handleChange}
                    />
                    Включать технические новости рынков
                </label>

                <label className={`${styles.checkbox} ${!form.announcements ? styles.inactive : ""}`}>
                    <input
                        type="checkbox"
                        name="announcements"
                        checked={form.announcements}
                        onChange={handleChange}
                    />
                    Включать анонсы и календари
                </label>

                <label className={`${styles.checkbox} ${!form.digests ? styles.inactive : ""}`}>
                    <input
                        type="checkbox"
                        name="digests"
                        checked={form.digests}
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
}

export default SearchForm