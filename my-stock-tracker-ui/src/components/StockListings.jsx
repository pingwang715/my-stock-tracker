import React, {useState, useMemo} from "react";
import StockCard from "./StockCard";
import SearchBox from "./SearchBox";
import { useLoaderData } from "react-router-dom";

export default function StockListings() {
  const [searchText, setSearchText] = useState("");
  const stocks = useLoaderData();

  const finalFilteredStocks = useMemo(() => {
    if (!Array.isArray(stocks)) {
      return [];
    }

    let filteredStocks = stocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(searchText.toLowerCase())
    );

    return filteredStocks;
  }, [stocks, searchText])

  function handleSearchChange(inputSearch) {
    setSearchText(inputSearch);
  }

  return (
    <div className="bg-normalbg dark:bg-darkbg">
      <div className="max-w-[1152px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12">
          <SearchBox
            label="Search"
            placeholder="Search stocks..."
            value={searchText}
            handleSearch={(value) => handleSearchChange(value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
          {finalFilteredStocks.length > 0 ? (
            finalFilteredStocks.map((stock) => (
              <StockCard key={stock.stockId} stock={stock} />
            ))
          ) : (
            <p className="text-center font-primary font-bold text-lg text-primary dark:text-light">No stocks found</p>
          )}
        </div>
      </div>
    </div>
  )
}
