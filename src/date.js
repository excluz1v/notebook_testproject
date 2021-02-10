export let timeSince = function (date) {

    let offset = new Date(date).getTimezoneOffset()
    let locallyOffset = new Date().getTimezoneOffset()

    let seconds

    if (offset === locallyOffset) seconds = Math.floor((new Date() - new Date(date)) / 1000);
    else if (offset < locallyOffset) seconds = Math.floor((new Date() - new Date(date) + (locallyOffset - offset) * 60000) / 1000);
    else seconds = Math.floor((new Date() - new Date(date) + (offset - locallyOffset) * 60000) / 1000)


    let interval = seconds / 31536000;

    if (interval >= 2) {
        return Math.floor(interval) + " лет. назад";
    }
    if (interval > 1) {
        return Math.floor(interval) + " г. назад";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " мес. назад";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " дн. назад";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " час. назад";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " мин. назад";
    }
    if (interval == 0) {
        return 'только что'
    }
    return Math.floor(seconds) + " сек. назад";
}

export const getDate = () => {

    let date = new Date();
    let curr_date = date.getDate();
    let curr_month = date.getMonth() + 1;
    let curr_year = date.getFullYear();
    if (curr_date < 10) {
        curr_date = "0" + curr_date;
    }

    if (curr_month < 10) {
        curr_month = "0" + curr_month;
    }
    return curr_date + "." + curr_month + "." + curr_year;
};
