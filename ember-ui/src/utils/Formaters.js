const date_formatter = (dateToFormat) => {
    const date = new Date(dateToFormat);
    const month = date.getMonth() + 1; // getMonth() is 0-based
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

const Formaters = {
    formatDate: date_formatter
}

export default Formaters;