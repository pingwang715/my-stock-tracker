import React from "react";
import stockMarketImage from "../assets/images/StockMarket.png";

export default function Banner() {
  return (
    <div>
      <img src={stockMarketImage} alt="Stock market image" className="min-w-full max-h-[552px]" />
    </div>
  )
}
