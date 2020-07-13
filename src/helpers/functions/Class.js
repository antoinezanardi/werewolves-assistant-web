/**
 *
 * @param obj
 * @param properties Needs to be a string (e.g: "property1.property2.etc")
 * @returns {boolean} If object has property or not
 */
export function hasProp(obj, properties) {
    if (obj === null || obj === undefined) {
        return false;
    }
    properties = properties.split(".");
    for (const property of properties) {
        if (obj[property] === undefined) {
            return false;
        }
        obj = obj[property];
    }
    return true;
}

export function getProp(obj, properties, defaultValue = undefined, callback = undefined) {
    if (hasProp(obj, properties)) {
        properties = properties.split(".");
        for (const property of properties) {
            obj = obj[property];
        }
        return callback ? callback(obj) : obj;
    } else {
        return defaultValue;
    }
}