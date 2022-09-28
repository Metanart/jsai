export function calcPercentageNumberOfNumber(partNumber: number, fullNumber: number): number {
    return Math.trunc((partNumber / fullNumber) * 100);
}
