export const MAX_DIGITS = 16;

export const getLength = (item) => {
    const re = /\d/g;
    return ((item || "").match(re) || []).length;
}

export const isDigitAddable = (digit, output) => {
    if((digit === "0" && output === "")) {
        return false;
    }
    if(getLength(output) === MAX_DIGITS) {
        return false;
    }
    return true;
}