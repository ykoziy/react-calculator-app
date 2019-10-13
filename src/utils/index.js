import { MAX_DIGITS } from "../constants/calculatorData"

const getLength = (item) => {
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