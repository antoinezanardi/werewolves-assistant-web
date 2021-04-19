import xss from "xss";

export function filterOutHTMLTags(str) {
    return xss(str, { whiteList: [], stripIgnoreTag: true });
}

export function capitalize(str) {
    const regExp = /(?:[-_'])(?:[a-z0-9-_])/u;
    return str.replace(regExp, x => x.toUpperCase());
}

export function addTrailingSlash(str) {
    if (typeof str !== "string") {
        return str;
    }
    return str.slice(-1) !== "/" ? `${str}/` : str;
}