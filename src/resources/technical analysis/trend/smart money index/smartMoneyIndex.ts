type SMIResult = {
    initial: number;
    indices: number[] | IterableIterator<number>;
};

function* calculateSMI(prices: { previousClose: number, first30Close: number, lastHourClose: number }[], initialSMI: number): IterableIterator<number> {
    let previousSMI = initialSMI;

    for (let i = 0; i < prices.length; i++) {
        const { previousClose, first30Close, lastHourClose } = prices[i];
        const first30GainLoss = first30Close - previousClose;
        const lastHourGainLoss = lastHourClose - previousClose;
        const currentSMI = previousSMI - first30GainLoss + lastHourGainLoss;

        yield currentSMI;
        previousSMI = currentSMI;
    }
}

function calculateSmartMoneyIndex(prices: { previousClose: number, first30Close: number, lastHourClose: number }[], initialSMI: number): SMIResult {
    return {
        initial: initialSMI,
        indices: calculateSMI(prices, initialSMI),
    };
}

// Example usage
const prices = [
    { previousClose: 1000, first30Close: 995, lastHourClose: 1005 },
    { previousClose: 1005, first30Close: 1000, lastHourClose: 1010 },
    { previousClose: 1010, first30Close: 1008, lastHourClose: 1015 },
];
const initialSMI = prices[0].previousClose;
const smiResult = calculateSmartMoneyIndex(prices, initialSMI);

console.log("Initial SMI:", smiResult.initial);
console.log("Indices:", [...smiResult.indices]);
