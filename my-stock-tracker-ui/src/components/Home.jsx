import React from "react";
import PageHeading from "./PageHeading";
import StockBoard from "./StockBoard";

export default function Home() {
  return (
    <div className="max-w-[1152px] mx-auto px-6 py-8">
      <PageHeading title="Bullish or Bearish?">
        Start building your financial portfolio today. Follow stock prices, and
        latest news about your favorite stocks.
      </PageHeading>
      <StockBoard>

      </StockBoard>
    </div>
  );
}
