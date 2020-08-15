export function isTouchDevice() {
    return "ontouchstart" in document.documentElement;
}