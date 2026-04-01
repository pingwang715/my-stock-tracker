import React, {useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../service/apiClient";

export default function PortfolioCard({ portfolio, onDelete }) {

  useEffect(() => {

  }, [portfolio]);

  const handleDelete = async () => {
    const userConfirmed = window.confirm("Are you sure you want to delete the portfolio?");
    if (!userConfirmed) return;

    try {
      await apiClient.delete(`/portfolios/${portfolio.portfolioId}`)
      onDelete(portfolio.portfolioId);
    } catch (error) {
      throw new Response(
        error.message || "Failed to delete your portfolio. Please try again.",
        {status: error.status || 500},
      );
    }
  };

  return (
    <div className="w-72 rounded-md mx-auto border border-gray-300 dark:border-gray-600 shadow-md flex flex-col bg-white dark:bg-gray-800 hover:border-primary dark:hover:border-lighter transition">
      <div className="relative h-40 p-4 flex flex-col font-primary">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-semibold text-primary dark:text-light mb-2">
            {portfolio.symbol}
          </h2>
          <FontAwesomeIcon
            icon={faX}
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(portfolio.portfolioId)}
          />
        </div>
        <p className="text-base text-gray-600 dark:text-lighter mb-2">
          {portfolio.shares} shares
        </p>
        <p className="text-base text-gray-600 dark:text-lighter mb-2">
          ${portfolio.purchasePrice} per share
        </p>
        <p className="text-base text-gray-600 dark:text-lighter">
          purchased on {portfolio.purchaseDate}
        </p>
      </div>
    </div>
  );
}
