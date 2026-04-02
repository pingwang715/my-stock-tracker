import React from "react";
import StockChart from "./StockChart";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function StockDetail() {

  const location = useLocation();
  const stock = location.state?.stock;

  return (
    <div className="min-h-[852px] flex justify-center font-primary bg-normalbg dark:bg-darkbg">
      <div className="flex flex-row items-center gap-4">
        <Link to="/stocks" className="text-xm text-primary hover:text-light dark:text-light dark:hover:text-lighter">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Stocks
        </Link>
        <StockChart symbol={stock.symbol}/>
      </div>
    </div>
  )
}
