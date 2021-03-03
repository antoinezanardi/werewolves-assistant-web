export function adjustNumber(number, options = {}) {
    if (isNaN(number) || number === "" || number < options.min) {
        return options.min ? options.min : 0;
    } else if (number > options.max) {
        return options.max;
    }
    return number;
}

export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}