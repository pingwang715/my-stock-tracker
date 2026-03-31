const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY;
const BASE_URL = "https://www.alphavantage.co/query?";

async function fetchJSON(queryParams) {
  const url = `${BASE_URL}${new URLSearchParams({
    ...queryParams,
    apikey: API_KEY,
  })}`;

  const response = await fetch(url);

  if (!response.ok) throw new Error("Alpha Vantage request failed.");

  return response.json();
}

export async function get100DaysPrices(ticker){

  const json = await fetchJSON({
    function: "TIME_SERIES_DAILY",
    symbol: ticker,
  });

  const timeSeries = json["Time Series (Daily)"];
  if(!timeSeries) return null;
  const sorted = Object.entries(timeSeries).sort(([a], [b]) => (a > b ? 1 : -1));
  const last100 = sorted.slice(-100);
  const closePrices = last100.map(([,values]) => parseFloat(values["4. close"]));
  const labels = last100.map(([date]) => date);

  const latestDate = json["Meta Data"]?.["3. Last Refreshed"];

  return {
    symbol: ticker,
    prices: closePrices,
    labels: labels,
    date: latestDate,
  };
}
