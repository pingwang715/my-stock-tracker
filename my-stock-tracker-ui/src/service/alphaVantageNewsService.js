const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY;
const BASE_URL = "https://www.alphavantage.co/query?";

async function fetchJSON(queryParams, symbols) {
  console.log("queryParams:", queryParams);
  console.log("symbols:", symbols);
  console.log("type:", typeof symbols);
  if (!symbols?.length) return [];

  const urls = symbols.map(symbol => {
    const url = `${BASE_URL}${new URLSearchParams({
      ...queryParams,
      ticker: symbol,
      apikey: API_KEY,
    })}`
    console.log(url);
    return url;
  });

  const responses = await Promise.all(urls.map(url => fetch(url)));
  const data = await Promise.all(responses.map(res => {
    if (!res.ok) throw new Error(`Failed to fetch: ${res.url} (${res.status})`);
    return res.json();
  }));

  console.log("Raw API response:", data);
  return data;

}

export async function getNews(symbols) {
  const json = await fetchJSON(
    { function: "NEWS_SENTIMENT" },
    symbols,
  );

  const feeds = json.flatMap(item => item["feed"] || [])
  console.log(feeds);
  const neutralFeeds = feeds.filter(feed => feed["overall_sentiment_label"] === "Neutral");
  console.log(neutralFeeds);
  if (!neutralFeeds.length) return null;

  return neutralFeeds.map(feed => ({
    title: feed.title,
    url:feed.url,
    summary: feed.summary,
    image: feed.banner_image,
    source: feed.source,
  }));
}

// getNews(["IBM"]).then(data => console.log(data)).catch(console.error);
