import React from "react";
import StockChart from "./StockChart";
import { useLocation } from "react-router-dom";

export default function StockDetail() {

  const location = useLocation();
  const stock = location.state?.stock;

  return (
    <div className="min-h-[852px] flex items-center justify-center font-primary bg-normalbg dark:bg-darkbg">
      <StockChart symbol={stock.symbol}/>
    </div>
  )
}
