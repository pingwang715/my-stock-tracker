export function getPortfolioSymbols(portfolioData) {
  const symbols = portfolioData?.map((portfolio) => portfolio.symbol);
  const uniqueSymbols = [...new Set(symbols)];
  return uniqueSymbols;
}
