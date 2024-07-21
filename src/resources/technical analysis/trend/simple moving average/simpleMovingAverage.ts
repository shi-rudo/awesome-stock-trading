type SMAResult = {
    period: number;
    averages: number[] | IterableIterator<number>;
};

function* calculateSMA(prices: number[], period: number): IterableIterator<number> {
    if (period <= 0) {
        throw new Error("Period must be a positive integer.");
    }
    if (prices.length < period) {
        throw new Error("Prices array length must be greater than or equal to the period.");
    }

    const buffer = new Float64Array(period);
    let sum = 0;
    let index = 0;

    // Initialize the sum with the first 'period' prices
    for (let i = 0; i < period; i++) {
        buffer[i] = prices[i];
        sum += prices[i];
    }

    // Yield the initial SMA
    yield sum / period;

    // Calculate the rest of the SMAs
    for (let i = period; i < prices.length; i++) {
        sum = sum - buffer[index] + prices[i];
        buffer[index] = prices[i];
        index = (index + 1) % period;

        if ((period & (period - 1)) === 0) {
            // If period is a power of 2, use bitwise operation for division
            yield sum * (1 / period);
        } else {
            yield sum / period;
        }
    }
}

function calculateSimpleMovingAverages(prices: number[], period: number): SMAResult {
    return {
        period,
        averages: calculateSMA(prices, period),
    };
}

// Example usage
const prices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const period = 5;
const smaResult = calculateSimpleMovingAverages(prices, period);

console.log("Period:", smaResult.period);
console.log("Averages:", [...smaResult.averages]);
