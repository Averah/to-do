export const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const getCurrentWeekDay = (date: Date) => week[date.getDay()]

export const getWeekDates = () => {
    const date = new Date();
    const currentWeekDates = Array(7).fill(undefined).map((_, idx) =>
        new Date(date.setDate(date.getDate() - date.getDay() + idx + 1)))
    return currentWeekDates
}










