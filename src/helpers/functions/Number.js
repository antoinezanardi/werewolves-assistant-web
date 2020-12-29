export function adjustNumber(number, options = {}) {
    if (isNaN(number) || number === "" || number < options.min) {
        return options.min ? options.min : 0;
    } else if (number > options.max) {
        return options.max;
    }
    return number;
}