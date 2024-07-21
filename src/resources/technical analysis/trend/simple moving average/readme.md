# Simple Moving Average (SMA) Indicator

The Simple Moving Average (SMA) is a widely used technical indicator in financial analysis. It smooths out price data by
creating a constantly updated average price, helping to identify trends over a specified period. 

## Key Concepts

### Definition

The Simple Moving Average is the average price of a security over a specified number of periods. Each new price point
causes the oldest price point to be dropped from the calculation, creating a moving average.

### Purpose

The SMA is used to:

- Identify the direction of the trend.
- Smooth out price fluctuations to reduce noise.
- Confirm support and resistance levels.

## Calculation

The SMA is calculated by taking the arithmetic mean of a given set of prices over a specific number of periods.

### Formula

#### Initial Calculation of SMA

$$
\textit{SMA}_{t} = \frac{p_{n-t+1} + p_{n-t+2} + \cdots + p_{n}}{t}
$$

$$
\textit{SMA}_{t} = \frac{1}{t} \sum_{i=n-t+1}^{n} p_{i}
$$

#### Updating the SMA

$$
\textit{SMA}_{t, \text{next}} = \frac{1}{t} \sum_{i=n-t+2}^{n+1} p_{i}
$$

$$
\textit{SMA}_{t, \text{next}} = \frac{1}{t} \Big( p_{n-t+2} + p_{n-t+3} + \dots + p_{n} + p_{n+1} \Big)
$$

$$
\textit{SMA}_{t, \text{next}} = \frac{1}{t} \Big( p_{n-t+1} + p_{n-t+2} + \dots + p_{n} \Big) - \frac{p_{n-t+1}}{t} + \frac{p_{n+1}}{t}
$$

$$
\textit{SMA}_{t, \text{next}} = \textit{SMA}_{t, \text{prev}} + \frac{1}{t} \Big( p_{n+1} - p_{n-t+1} \Big)
$$

where:
- $\textit{SMA}_{t}$ is the Simple Moving Average over the last $t$ periods.
- $p_{n}$ is the most recent data point.
- $p_{n-t+1}$ is the $t$-th most recent data point.
- $\textit{SMA}_{t, \text{next}}$ is the updated SMA after adding a new data point $p_{n+1}$.
- $\textit{SMA}_{t, \text{prev}}$ is the previous SMA before adding the new data point.
- $t$ is the number of periods over which the average is calculated.


### Example

For a 5-day SMA:

1. Collect the closing prices for the last 5 days: \( P_1, P_2, P_3, P_4, P_5 \).
2. Add the prices: \( P_1 + P_2 + P_3 + P_4 + P_5 \).
3. Divide by the number of periods (5): \( \frac{P_1 + P_2 + P_3 + P_4 + P_5}{5} \).

## Application

### Trend Identification

- **Bullish Trend**: When the price is consistently above the SMA.
- **Bearish Trend**: When the price is consistently below the SMA.

### Support and Resistance

- **Support**: In an uptrend, the SMA can act as a support level where the price tends to bounce back up.
- **Resistance**: In a downtrend, the SMA can act as a resistance level where the price tends to pull back down.

### Crossovers

- **Golden Cross**: Occurs when a short-term SMA crosses above a long-term SMA, indicating a potential bullish trend.
- **Death Cross**: Occurs when a short-term SMA crosses below a long-term SMA, indicating a potential bearish trend.

## Advantages and Limitations

### Advantages

- **Simplicity**: Easy to calculate and understand.
- **Trend Analysis**: Effective in identifying and confirming trends.

### Limitations

- **Lagging Indicator**: Based on past prices, which may result in delayed signals.
- **Sensitivity to Period Length**: The choice of period length can significantly affect the responsiveness and
  reliability of the SMA.
