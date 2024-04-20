const getAvgPrice = (prices: number[]): number => {
  return prices.reduce((acc, price) => acc + price, 0) / prices.length;
};
