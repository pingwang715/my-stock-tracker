import React from "react";
import PageHeading from "./PageHeading";
import StockBoard from "./StockBoard";
import Banner from "./Banner";
import TickerBar from "./TickerBar";

export default function Home() {
  return (
    <div className="w-full mx-auto">
      <TickerBar />
      <Banner />
      <PageHeading title="Bullish or Bearish?">
        Start building your financial portfolio today. Follow stock prices, and
        latest news about your favorite stocks.
      </PageHeading>
      <StockBoard>

      </StockBoard>
    </div>
  );
}
