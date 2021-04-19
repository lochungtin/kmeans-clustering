export const round = (num: number, dp: number) => {
    const factor = Math.pow(10, dp);
    return Math.round(num * factor) / factor;
}
