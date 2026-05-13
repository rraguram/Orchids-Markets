import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, PieChart as PieIcon, Activity, RefreshCw } from "lucide-react";
import { PORTFOLIO_HOLDINGS } from "@/lib/mockData";
import SignalBadge from "@/components/shared/SignalBadge";
import SectorAllocationChart from "@/components/portfolio/SectorAllocationChart";
import PerformanceHeatmap from "@/components/portfolio/PerformanceHeatmap";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#6366f1"];

export default function Portfolio() {
    const navigate = useNavigate();
    const [tab, setTab] = useState("holdings");

    const totalValue = PORTFOLIO_HOLDINGS.reduce((acc, h) => acc + h.shares * h.currentPrice, 0);
    const dayGain = 2144.20; // Mocked
    const dayGainPct = 1.52; // Mocked

    const allocationData = PORTFOLIO_HOLDINGS.map((h) => ({
        name: h.ticker,
        value: h.shares * h.currentPrice
    }));

    const typeData = [
        { name: "Stocks", value: 92412 },
        { name: "ETFs", value: 34000 },
        { name: "Crypto", value: 16000 }
    ];

    return (
        <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Main Portfolio</h1>
                    <p className="text-xs text-muted-foreground mt-0.5">Track your assets, allocation, and performance metrics.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Total Value</div>
                        <div className="text-xl font-black">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                    </div>
                    <div className="w-px h-8 bg-border mx-1" />
                    <div className="text-right">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Day's Change</div>
                        <div className="text-xl font-black text-emerald-500">+${dayGain.toLocaleString()} ({dayGainPct}%)</div>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="holdings" onValueChange={setTab} className="w-full">
                <TabsList className="bg-muted/50 p-1 rounded-xl h-9 w-full sm:w-auto">
                    <TabsTrigger value="holdings" className="text-xs gap-2 px-4"><Activity className="w-3.5 h-3.5" /> Holdings</TabsTrigger>
                    <TabsTrigger value="allocation" className="text-xs gap-2 px-4"><PieIcon className="w-3.5 h-3.5" /> Allocation</TabsTrigger>
                    <TabsTrigger value="performance" className="text-xs gap-2 px-4"><TrendingUp className="w-3.5 h-3.5" /> Performance</TabsTrigger>
                    <TabsTrigger value="rebalance" className="text-xs gap-2 px-4"><RefreshCw className="w-3.5 h-3.5" /> Rebalance</TabsTrigger>
                </TabsList>

                <TabsContent value="holdings" className="space-y-6 mt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-3 bg-card border border-border rounded-xl overflow-hidden">
                            <div className="px-4 py-3 border-b border-border bg-accent/20 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-primary" />
                                <h3 className="text-sm font-semibold">Holdings</h3>
                            </div>
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="border-b border-border text-[10px] text-muted-foreground uppercase tracking-wider">
                                        <th className="px-3 py-2 text-left">Asset</th>
                                        <th className="px-3 py-2 text-right">Shares</th>
                                        <th className="px-3 py-2 text-right">Avg Cost</th>
                                        <th className="px-3 py-2 text-right">Price</th>
                                        <th className="px-3 py-2 text-right">Value</th>
                                        <th className="px-3 py-2 text-right">P&L</th>
                                        <th className="px-3 py-2 text-center">Signal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PORTFOLIO_HOLDINGS.map((h) => {
                                        const value = h.shares * h.currentPrice;
                                        const pl = (h.currentPrice - h.avgCost) * h.shares;
                                        const plPct = ((h.currentPrice - h.avgCost) / h.avgCost) * 100;
                                        return (
                                            <tr key={h.ticker} onClick={() => navigate(`/asset/${h.ticker}`)} className="border-b border-border/50 hover:bg-accent/50 cursor-pointer transition-colors">
                                                <td className="px-3 py-2.5">
                                                    <span className="font-mono font-semibold text-primary">{h.ticker}</span>
                                                    <span className="text-muted-foreground ml-2 hidden sm:inline">{h.name}</span>
                                                </td>
                                                <td className="px-3 py-2.5 text-right font-mono">{h.shares}</td>
                                                <td className="px-3 py-2.5 text-right font-mono text-muted-foreground">${h.avgCost.toFixed(2)}</td>
                                                <td className="px-3 py-2.5 text-right font-mono">${h.currentPrice.toFixed(2)}</td>
                                                <td className="px-3 py-2.5 text-right font-mono">${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                                <td className="px-3 py-2.5 text-right">
                                                    <span className={`font-mono ${pl >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                                                        {pl >= 0 ? "+" : ""}{plPct.toFixed(1)}%
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2.5 text-center"><SignalBadge signal={h.signal} /></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="space-y-4">
                            <Card className="bg-card border-border">
                                <CardHeader className="pb-2 px-4 pt-4">
                                    <CardTitle className="text-xs font-medium text-muted-foreground">By Asset</CardTitle>
                                </CardHeader>
                                <CardContent className="px-4 pb-4">
                                    <ResponsiveContainer width="100%" height={160}>
                                        <PieChart>
                                            <Pie data={allocationData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2} dataKey="value" stroke="none">
                                                {allocationData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                            </Pie>
                                            <Tooltip contentStyle={{ background: "hsl(220, 18%, 9%)", border: "1px solid hsl(220, 14%, 14%)", borderRadius: 8, fontSize: 11 }} formatter={(v) => [`$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, ""]} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                                        {allocationData.map((d, i) => (
                                            <div key={d.name} className="flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                                                <span className="text-[10px] text-muted-foreground truncate">{d.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-card border-border">
                                <CardHeader className="pb-2 px-4 pt-4">
                                    <CardTitle className="text-xs font-medium text-muted-foreground">By Type</CardTitle>
                                </CardHeader>
                                <CardContent className="px-4 pb-4">
                                    <ResponsiveContainer width="100%" height={120}>
                                        <PieChart>
                                            <Pie data={typeData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} paddingAngle={3} dataKey="value" stroke="none">
                                                {typeData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                                            </Pie>
                                            <Tooltip contentStyle={{ background: "hsl(220, 18%, 9%)", border: "1px solid hsl(220, 14%, 14%)", borderRadius: 8, fontSize: 11 }} formatter={(v) => [`$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, ""]} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="flex items-center justify-center gap-6 mt-2">
                                        {typeData.map((d, i) => (
                                            <div key={d.name} className="flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                                                <span className="text-[10px] text-muted-foreground">{d.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Analytics section */}
                    <div>
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Analytics</h2>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            <SectorAllocationChart />
                            <PerformanceHeatmap />
                        </div>
                    </div>

                </TabsContent>
            </Tabs>
        </div>
    );
}
