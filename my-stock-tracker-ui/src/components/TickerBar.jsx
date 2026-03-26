import { useRef } from "react";

const tickers = [
  { symbol: "AAPL", price: "213.49", change: "+1.24%", up: true },
  { symbol: "TSLA", price: "248.10", change: "+3.87%", up: true },
  { symbol: "NVDA", price: "875.39", change: "+2.15%", up: true },
  { symbol: "AMZN", price: "192.45", change: "-0.63%", up: false },
  { symbol: "MSFT", price: "415.20", change: "+0.91%", up: true },
  { symbol: "META", price: "512.77", change: "+1.58%", up: true },
  { symbol: "GOOGL", price: "175.98", change: "-0.42%", up: false },
  { symbol: "BTC", price: "68,240", change: "+4.12%", up: true },
  { symbol: "ETH", price: "3,512", change: "+2.88%", up: true },
  { symbol: "NFLX", price: "628.40", change: "-1.10%", up: false },
];

// duplicate for seamless infinite scroll
const doubled = [...tickers, ...tickers];

export default function TickerBar() {
  const trackRef = useRef(null);

  // pause on hover
  const pauseScroll = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const resumeScroll = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return (
    <div
      className="relative w-full bg-gray-950 border-b border-pink-500/20 overflow-hidden"
      onMouseEnter={pauseScroll}
      onMouseLeave={resumeScroll}
    >
      {/* Left fade */}
      <div className="absolute left-0 top-0 h-full w-16 bg-linear-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 h-full w-16 bg-linear-to-r from-gray-950 to-transparent z-10 pointer-events-none" />

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="flex items-center py-2 w-max animate-[ticker_30s_linear_infinite]"
        style={{ animationTimingFunction: "linear" }}
      >
        {doubled.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-6 border-r border-white/5 shrink-0"
          >
            {/* Live dot */}
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${t.up ? "bg-emerald-400" : "bg-rose-400"}`}
              />
              <span
                className={`relative inline-flex rounded-full h-1.5 w-1.5 ${t.up ? "bg-emerald-400" : "bg-rose-400"}`}
              />
            </span>

            {/* Symbol */}
            <span className="text-xs font-semibold tracking-widest text-slate-200 uppercase">
              {t.symbol}
            </span>

            {/* Price */}
            <span className="text-xs font-mono text-slate-400">
              ${t.price}
            </span>

            {/* Change badge */}
            <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-sm tracking-wide ${t.up ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"}`}>
              {t.up ? "▲" : "▼"} {t.change}
            </span>
          </div>
        ))}
      </div>

      {/* Keyframe injection (Tailwind JIT custom animation) */}
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
