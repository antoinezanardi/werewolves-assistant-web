/**
 * @description Insert a value into the array according to the condition. Needs to be called like ...insertIf(condition, value1, value2, value3)
 * @param condition <Boolean>
 * @param elements <any> List of values to insert
 * @returns {*[]}
 */
export function insertIf(condition, ...elements) {
    return condition ? elements : [];
}