use std::iter::Iterator;

pub struct SMAResult {
    period: usize,
    averages: Box<dyn Iterator<Item = f64>>,
}

impl SMAResult {
    pub fn new(period: usize, averages: Box<dyn Iterator<Item = f64>>) -> Self {
        SMAResult { period, averages }
    }

    pub fn period(&self) -> usize {
        self.period
    }

    pub fn averages(&mut self) -> &mut dyn Iterator<Item = f64> {
        &mut self.averages
    }
}

struct SMAIterator {
    prices: Vec<f64>,
    period: usize,
    buffer: Vec<f64>,
    sum: f64,
    index: usize,
    current: usize,
}

impl SMAIterator {
    fn new(prices: Vec<f64>, period: usize) -> Self {
        let mut sum = 0.0;
        let buffer: Vec<f64> = prices.iter().take(period).map(|&x| {
            sum += x;
            x
        }).collect();

        SMAIterator {
            prices,
            period,
            buffer,
            sum,
            index: 0,
            current: 0,
        }
    }

    fn is_power_of_two(n: usize) -> bool {
        n > 0 && (n & (n - 1)) == 0
    }
}

impl Iterator for SMAIterator {
    type Item = f64;

    fn next(&mut self) -> Option<Self::Item> {
        if self.current >= self.prices.len() - self.period + 1 {
            return None;
        }

        if self.current > 0 {
            self.sum -= self.buffer[self.index];
            self.sum += self.prices[self.current + self.period - 1];
            self.buffer[self.index] = self.prices[self.current + self.period - 1];
            self.index = (self.index + 1) % self.period;
        }

        let average = if Self::is_power_of_two(self.period) {
            self.sum * (1.0 / self.period as f64)
        } else {
            self.sum / self.period as f64
        };

        self.current += 1;
        Some(average)
    }
}

pub fn calculate_sma(prices: Vec<f64>, period: usize) -> Result<SMAResult, String> {
    if period == 0 {
        return Err("Period must be a positive integer.".to_string());
    }
    if prices.len() < period {
        return Err("Prices vector length must be greater than or equal to the period.".to_string());
    }

    let iterator = Box::new(SMAIterator::new(prices, period));
    Ok(SMAResult::new(period, iterator))
}

fn main() {
    let prices = vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0];
    let period = 5;

    match calculate_sma(prices, period) {
        Ok(mut sma_result) => {
            println!("Period: {}", sma_result.period());
            println!("Averages: {:?}", sma_result.averages().collect::<Vec<f64>>());
        },
        Err(e) => println!("Error: {}", e),
    }
}