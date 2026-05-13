import React from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import TickerTape from "@/components/dashboard/TickerTape";
import MoversCard from "@/components/dashboard/MoversCard";
import PortfolioSnapshot from "@/components/dashboard/PortfolioSnapshot";
import NewsWidget from "@/components/dashboard/NewsWidget";
import FearGreedGauge from "@/components/dashboard/FearGreedGauge";
import StockTwitsWidget from "@/components/dashboard/StockTwitsWidget";
import EconCalendar from "@/components/dashboard/EconCalendar";
import WatchlistWidget from "@/components/dashboard/WatchlistWidget";
import { TOP_GAINERS, TOP_LOSERS, MOST_ACTIVE } from "@/lib/mockData";

export default function Dashboard() {
    return (
        <div className="space-y-2 md:space-y-3">
            {/* Market Pulse Ticker */}
            <TickerTape />

            {/* Primary row: movers 3-col + portfolio snapshot */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
                <MoversCard title="Top Gainers" icon={TrendingUp} data={TOP_GAINERS} type="gainers" />
                <MoversCard title="Top Losers" icon={TrendingDown} data={TOP_LOSERS} type="losers" />
                <div className="col-span-2 sm:col-span-1 xl:col-span-1">
                    <MoversCard title="Most Active" icon={Activity} data={MOST_ACTIVE} type="gainers" />
                </div>
                <div className="col-span-2 sm:col-span-3 xl:col-span-1">
                    <PortfolioSnapshot />
                </div>
            </div>

            {/* Secondary row: watchlist + news + fear/greed + econ calendar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-3">
                <WatchlistWidget />
                <NewsWidget />
                <FearGreedGauge />
                <EconCalendar />
            </div>

            {/* Social */}
            <div className="grid grid-cols-1 gap-2 md:gap-3">
                <StockTwitsWidget />
            </div>
        </div>
    );
}
