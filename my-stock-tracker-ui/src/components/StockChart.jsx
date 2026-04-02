import { useState, useEffect, useRef, useCallback } from "react";
import Chart from "chart.js/auto";
import { get100DaysPrices } from "../service/alphaVantage100Service";
import PageTitle from "./PageTitle";

// helpers
async function generateData(symbol) {
  try {
    const result = await get100DaysPrices(symbol.toUpperCase());
    if (!result) {
      throw new Response(
        "Failed to fetch prices from Alpha Vantage. Please try again.",
        { status: 500 },
      );
    }
    const { symbol: sym, prices, labels, date } = result;
    return { symbol: sym, prices, labels, date };
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to generate stock price data. Please try again.",
      { status: error.status || 500 },
    );
  }
}

function computeMetrics(prices) {
  const last = prices[prices?.length - 1];
  const first = prices[0];
  const change = last - first;
  const pct = ((change / first) * 100).toFixed(2);

  return {
    price: "$" + last.toFixed(2),
    change: (change >= 0 ? "+" : "-") + pct + "%",
    positive: change >= 0,
    high: "$" + Math.max(...prices).toFixed(2),
    low: "$" + Math.min(...prices).toFixed(2),
  };
}

// sub-components
function MetricCard({ label, value, valueColor}) {

  return (
    <div className="bg-[#f1efe8] dark:bg-gray-700 rounded-lg p-4">
      <p className="text-xs text-[#5F5E5A] dark:text-gray-300 mb-1">{label}</p>
      <p className="text-xl font-medium" >
        {value}
      </p>
    </div>
  );
}

// main component
export default function StockChart({ symbol }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const [status, setStatus] = useState("demo");
  const [footer, setFooter] = useState("Showing live data");
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  const renderChart = useCallback((labels, prices) => {
    setMetrics(computeMetrics(prices));

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, "rgba(55,138,221,0.18)");
    gradient.addColorStop(1, "rgba(55,138,221,0)");

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            data: prices,
            borderColor: "#378ADD",
            borderWidth: 2,
            backgroundColor: gradient,
            fill: true,
            tension: 0.2,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: "#378ADD",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#fff",
            borderColor: "rgba(0,0,0,0.08)",
            borderWidth: 1,
            titleColor: "#5F5E5A",
            bodyColor: "#2C2C2A",
            padding: 10,
            callbacks: {
              label: (ctx) => " $" + ctx.parsed.y.toFixed(2),
            },
          },
        },
        scales: {
          x: {
            grid: { color: "rgba(0,0,0,0.07)" },
            ticks: {
              color: "#5F5E5A",
              font: { size: 11 },
              maxTicksLimit: 8,
              maxRotation: 0,
            },
          },
          y: {
            grid: { color: "rgba(0,0,0,0.07)" },
            ticks: {
              color: "#5F5E5A",
              font: { size: 11 },
              callback: (v) => "$" + v.toFixed(0),
            },
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const { labels, prices } = await generateData(symbol);
        renderChart(labels, prices);
      } catch (error) {
        console.error(error);
      }
    };

    loadInitialData();

    return () => chartRef.current?.destroy;
  }, [renderChart, symbol]);



  return (
    <div className="font-sans text-primary dark:text-light p-6 max-w-[900px] mx-auto">

      <PageTitle title={symbol} />

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <MetricCard label="latest close" value={metrics?.price ?? "—"} />
        <MetricCard
          label="100-day change"
          value={metrics?.change ?? "—"}
          valueColor={
            metrics ? (metrics.positive ? "#1D9E75" : "#E24B4A") : undefined
          }
        />
        <MetricCard label="period high" value={metrics?.high ?? "—"} />
        <MetricCard label="period low" value={metrics?.low ?? "—"} />
      </div>

      {/* Chart — canvas owned by Chart.js */}
      <div style={{ position: "relative", width: "100%", height: 500 }}>
        <canvas ref={canvasRef} />
      </div>

      <p className="text-xs text-[#888780 m-3]">{footer}</p>

    </div>

  );
}
