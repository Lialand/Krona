export default function formatDate(startDateArg, finishDateArg, withYear) {

    let startDate = new Date(startDateArg);
    let finishDate = new Date(finishDateArg);

    if (!withYear) {

        let startMonth = whatIsMonth(startDate.getMonth());
        let finishMonth = whatIsMonth(finishDate.getMonth());

        if (startMonth === finishMonth) {
            startMonth = "";
        }

        startDate = removeNullInDate(startDate.getDate());
        finishDate = removeNullInDate(finishDate.getDate());
        
        function removeNullInDate(date) {
            if (toString(date).split('')[0] === 0) {
                return date.split('')[1];
            }
            else
                return date;
        }

        function whatIsMonth(month) {
            let months = [
                "января", 
                "февраля", 
                "марта",
                "апреля",
                "мая",
                "июня",
                "июля",
                "августа",
                "сентября",
                "октября",
                "ноября",
                "декабря"
            ];
            return months[month];
        }

        startDate += " " + startMonth;
        finishDate += " " + finishMonth;

    } else {
        startDate = startDate.toLocaleDateString().slice(0, 6) + startDate.toLocaleDateString().slice(8, 10);
        finishDate = finishDate.toLocaleDateString().slice(0, 6) + finishDate.toLocaleDateString().slice(8, 10);
    }

    return {startDate, finishDate};
};

export function formatToMonthAndYear(date) {
    const newDate = new Date(date);

    let month = newDate.getMonth() + 1;
    if (month.toString.length < 2) {
        month = "0" + month;
    }

    let year = newDate.getFullYear();

    return `${month}.${year}`
};