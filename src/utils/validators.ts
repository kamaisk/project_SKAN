export const validateDateRange = (startDate: string, endDate: string): string | null => {
    if (!startDate || !endDate) return "Введите корректные диапазон дат";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return "Введите корректный диапазон дат";
    }

    if (start > end) {
        return "Дата начала не может быть позже даты конца";
    }

    if (start > now || end > now) {
        return "Даты не могут быть в будущем";
    }

    return null;
}