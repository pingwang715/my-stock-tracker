import React, {useState, useEffect, useMemo} from "react";
import { getPortfolioSymbols } from "../service/newsService";
import { getNews } from "../service/alphaVantageNewsService";
import NewsCard from "./NewsCard";
import PageTitle from "./PageTitle";
import { useRouteLoaderData } from "react-router-dom";

export default function News() {

  const portfolioData = useRouteLoaderData("root");
  const symbols = useMemo(() => getPortfolioSymbols(portfolioData), [portfolioData]);
  const [feeds, setFeeds] = useState(null);

  useEffect(() => {
    if (!symbols?.length) return;

    async function fetchNews() {
      const data = await getNews(symbols);
      setFeeds(data);
    }
    fetchNews();
  }, [symbols]);

  if (!feeds) return <div>Loading...</div>

  return (
    <div className="bg-normalbg dark:bg-darkbg">
      <div className="max-w-[1152px] min-h-[852px] mx-auto px-6 py-8 font-primary">
        <PageTitle title="Stock News" />

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-6 py-12">
          {feeds?.length > 0 ? (
            feeds.map((feed) => (
              <NewsCard feed={feed} />
            ))
          ) : (
            <p className="text-center font-primary font-bold text-lg text-primary dark:text-light">
              No News found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
