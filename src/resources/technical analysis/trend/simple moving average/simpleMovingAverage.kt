import kotlin.math.pow

data class SMAResult(
    val period: Int,
    val averages: Sequence<Double>
)

fun calculateSMA(prices: List<Double>, period: Int): Sequence<Double> = sequence {
    require(period > 0) { "Period must be a positive integer." }
    require(prices.size >= period) { "Prices list length must be greater than or equal to the period." }

    val buffer = DoubleArray(period)
    var sum = 0.0
    var index = 0

    // Initialize the sum with the first 'period' prices
    for (i in 0 until period) {
        buffer[i] = prices[i]
        sum += prices[i]
    }

    // Yield the initial SMA
    yield(sum / period)

    // Calculate the rest of the SMAs using the efficient update formula
    for (i in period until prices.size) {
        sum = sum - buffer[index] + prices[i]
        buffer[index] = prices[i]
        index = (index + 1) % period

        if (period.isPowerOfTwo()) {
            // If period is a power of 2, use bit shift for division
            yield(sum * (1.0 / period))
        } else {
            yield(sum / period)
        }
    }
}

fun getSMAResult(prices: List<Double>, period: Int): SMAResult {
    return SMAResult(
        period = period,
        averages = calculateSMA(prices, period)
    )
}

// Extension function to check if a number is a power of 2
fun Int.isPowerOfTwo(): Boolean = this > 0 && (this and (this - 1)) == 0

fun main() {
    val prices = listOf(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0)
    val period = 5
    val smaResult = getSMAResult(prices, period)

    println("Period: ${smaResult.period}")
    println("Averages: ${smaResult.averages.toList()}")
}