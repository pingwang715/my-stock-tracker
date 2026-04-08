import React from "react";
import { useState } from "react";
import { getDailyPriceWithPerformance } from "../service/alphaVantageService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { useStock } from "../store/stock-context";

export default function StockBoard() {
  const textFieldStyle =
    "p-3 text-base border border-primary rounded-md transition focus:ring focus:ring-dark focus:outline-none dark:focus:ring-lighter text-gray-800 placeholder-gray-400 dark:bg-darkbg dark:text-light dark:placeholder-gray-500 dark:border-gray-600";
  const buttonStyle =
    "font-primary bg-primary hover:bg-dark text-white flex items-center py-3 px-5 rounded-md";

  const [symbol, setSymbol] = useState("");
  const [error, setError] = useState("");
  const [performance, setPerformance] = useState(null);
  const [displaySymbol, setDisplaySymbol] = useState("");
  const [currentStock, setCurrentStock] = useState(null);
  const { addToStock, removeFromStock, isSaved } = useStock();

  const toggleSave = () => {
    if (!currentStock) return;
    if (isSaved(currentStock.stockId)) {
      removeFromStock(currentStock.stockId);
    } else {
      addToStock(currentStock);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    try {
      const result = await getDailyPriceWithPerformance(symbol.toUpperCase());
      console.log(result);
      if (!result) {
        setPerformance(null);
        setDisplaySymbol("");
        setError("Stock not found");
        return;
      }

      const { ticker, performance } = result;

      setPerformance(performance);
      setDisplaySymbol(symbol.toUpperCase());

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/stocks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: symbol.toUpperCase(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const savedStock = await response.json();
      setCurrentStock(savedStock);
    } catch (error) {
      console.error(error);
      setError("something went wrong");
      setPerformance(null);
      setDisplaySymbol("");
    }
  }

  return (
    <div className="bg-white dark:bg-darkbg">
      <div className="max-w-[576px] rounded-md shadow-lg border border-gray-300 dark:border-gray-700 hover:border-gray-300 p-10 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="font-primary font-extrabold text-primary dark:text-light text-xl flex justify-center items-center mx-auto ">
            What's on your mind today?
          </div>

          <div className="p-5 mt-5 flex flex-cols justify-center gap-3">
            <input
              value={symbol}
              type="text"
              placeholder="AAPL"
              className={textFieldStyle}
              onChange={(e) => setSymbol(e.target.value)}
            />
            <button className={buttonStyle}>Submit</button>
          </div>
        </form>

        <div className="p-5 m-5 flex justify-between items-center bg-gray-200 dark:bg-darkbg rounded-md gap-5">
          <div className="font-primary text-lg text-primary dark:text-light">
            {displaySymbol ? displaySymbol : "Stock"}
          </div>
          <div>
            <span
              className={`font-semibold ${isNaN(performance) ? "text-black" : performance > 0 ? "text-emerald-500" : "text-rose-500"}`}
            >
              {performance == null
                ? ""
                : `${performance > 0 ? "▲" : "▼"} ${performance}%`}
            </span>
            <button
              onClick={toggleSave}
              className="mx-1 text-lg text-primary hover:text-dark dark:text-light hover:dark:text-lighter"
            >
              <FontAwesomeIcon
                icon={
                  currentStock && isSaved(currentStock.stockId) ? faCircleMinus : faCirclePlus
                }
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
