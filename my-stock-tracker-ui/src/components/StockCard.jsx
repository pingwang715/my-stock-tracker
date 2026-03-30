import React from "react";
import { Link } from "react-router-dom";

export default function StockCard({ stock }) {
  return (
    <Link
      to={`/watchlist/${stock.stockId}`}
      state={{ stock }}
      className="w-72 rounded-md mx-auto border border-gray-300 dark:border-gray-600 shadow-md overflow-hidden flex flex-col bg-white dark:bg-gray-800 hover:border-primary dark:hover:border-lighter transition"
    >
      <div className="relative w-full h-48 p-4 flex flex-col font-primary border-b border-gray-300 dark:border-gray-600">
        <h2 className="text-xl font-semibold text-primary dark:text-light mb-2">
          {stock.symbol}
        </h2>
      </div>
    </Link>
  )
}
