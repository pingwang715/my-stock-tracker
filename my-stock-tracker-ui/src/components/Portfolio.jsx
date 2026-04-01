import React, {useState} from "react";
import PageTitle from "./PageTitle";
import PortfolioCard from "./PortfolioCard";
import PortfolioForm from "./PortfolioForm";
import apiClient from "../service/apiClient";
import { useLoaderData} from "react-router-dom";

export default function Portfolio() {
  const loaderData = useLoaderData();
  const [showForm, setShowForm] = useState(false);
  const [portfolios, setPortfolios] = useState(loaderData);
  const buttonStyle =
    "flex items-center justify-center mx-auto font-primary bg-primary hover:bg-dark text-white flex items-center py-3 px-5 rounded-md";

  const handleDelete = (deleteId) => {
    setPortfolios(prev => prev.filter(p => p.portfolioId !== deleteId));
  }

  return (
    <div className="bg-normalbg dark:bg-darkbg">
      <div className="max-w-[1152px] min-h-[852px] mx-auto px-6 py-8 font-primary">
        <PageTitle title="My Portfolios" />
        <button onClick={() => setShowForm(true) } className={buttonStyle}>
          Add Portfolio
        </button>

        <PortfolioForm isOpen={showForm} onClose={() => setShowForm(false)} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
          {portfolios?.length > 0 ? (
            portfolios.map((portfolio) => (
              <PortfolioCard
                key={portfolio.portfolioId}
                portfolio={portfolio}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-center font-primary font-bold text-lg text-primary">
              No portfolios found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export async function portfoliosLoader() {
  try {
    const response = await apiClient.get("/portfolios");
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch portfolios. Please try again.",
      { status: error.status || 500 },
    );
  }
}
