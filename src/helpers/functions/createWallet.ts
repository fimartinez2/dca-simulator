interface WalletItem {
  date: Date;
  totalInvestment: number;
  totalBought: number;
  priceToDate: number;
  totalValue: number;
  totalProfit: number;
  profitPercentage: number;
}

export const createWalletDCA = (
  prices: { date: Date; avgPrice: number }[],
  inversionAmount: number
) => {
  const wallet: WalletItem[] = [];
  let totalInvestment = 0;
  let totalBought = 0;
  let totalValue = 0;
  let profitPercentage = 0;
  let priceToDate = 0;
  let profit = 0;

  for (const price of prices) {
    if (totalBought === 0) {
      totalInvestment = inversionAmount;
      totalBought = inversionAmount / price.avgPrice;
      priceToDate = price.avgPrice;
      totalValue = totalBought * price.avgPrice;
      profit = totalValue - totalInvestment;
      profitPercentage = (profit / totalInvestment) * 100;
    } else {
      totalInvestment += inversionAmount;
      totalBought += inversionAmount / price.avgPrice;
      priceToDate = price.avgPrice;
      totalValue = totalBought * price.avgPrice;
      profit = totalValue - totalInvestment;
      profitPercentage = (profit / totalInvestment) * 100;
    }

    wallet.push({
      date: price.date,
      totalInvestment,
      totalBought,
      priceToDate,
      totalValue,
      totalProfit: profit,
      profitPercentage,
    });
  }

  return wallet;
};
