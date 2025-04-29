
export function isNumber(value: any) {
    return value !== null && value !== undefined && !isNaN(parseFloat(value)) && isFinite(value);
}