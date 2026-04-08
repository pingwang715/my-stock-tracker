import { createContext, useEffect, useContext, useReducer, Children } from "react";

export const StockContext = createContext();

export const useStock = () => useContext(StockContext);

const ADD_TO_STOCK = "ADD_TO_STOCK";
const REMOVE_FROM_STOCK = "REMOVE_FROM_STOCK";

const stockReducer = (prevStock, action) => {
  const stock = action.payload;
  switch (action.type) {
    case ADD_TO_STOCK: {
      const existingItem = prevStock.some(
        (item) => item.stockId === stock.stockId
      );

      if (existingItem) {
        return prevStock;
      }
      return [...prevStock, stock];
    }

    case REMOVE_FROM_STOCK:
      return prevStock.filter(
        (item) => item.stockId !== action.payload
      );
    default:
      return prevStock;
  }
};

export const StockProvider = ({ children }) => {
  const initialStockState = (() => {
    try {
      const storedStock = localStorage.getItem("stock");
      if (!storedStock || storedStock === "undefined") {
        return [];
      }
      const parsed = JSON.parse(storedStock);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to parse stock from localStorage:", error);
      return [];
    }
  })();

  const [stock, dispatch] = useReducer(stockReducer, initialStockState);

  useEffect(() => {
    try {
      localStorage.setItem("stock", JSON.stringify(stock));
    } catch (error) {
      console.error("Failed to save stock to localStorage:", error);
    }
  }, [stock]);

  const addToStock = stock => {
    dispatch({ type: ADD_TO_STOCK, payload: stock })
  }

  const removeFromStock = (stockId) => {
    dispatch({ type: REMOVE_FROM_STOCK, payload: stockId })
  }

  const isSaved = (stockId) => {
    return stock.some((item) => item.stockId === stockId);
  }

  return (
    <StockContext.Provider
      value={{ addToStock, removeFromStock, isSaved}}
    >
      {children}
    </StockContext.Provider>
  );
};
