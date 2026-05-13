import React from \"react\";
import { useNavigate } from \"react-router-dom\";
import SignalBadge from \"@/components/shared/SignalBadge\";
import { ChevronUp, ChevronDown, ChevronsUpDown } from \"lucide-react\";
import { cn } from \"@/lib/utils\";

const COLUMNS = [
    { key: \"ticker\", label: \"Ticker\", align: \"left\", mono: true, sortable: true },
    { key: \"name\", label: \"Name\", align: \"left\", mono: false, sortable: true, hide: \"sm\" },
    { key: \"type\", label: \"Type\", align: \"left\", mono: false, sortable: true, hide: \"md\" },
    { key: \"sector\", label: \"Sector\", align: \"left\", mono: false, sortable: true, hide: \"lg\" },
    { key: \"price\", label: \"Price\", align: \"right\", mono: true, sortable: true },
    { key: \"pctChange\", label: \"Change\", align: \"right\", mono: true, sortable: true },
    { key: \"marketCapRaw\", label: \"Mkt Cap\", align: \"right\", mono: true, sortable: true, hide: \"md\" },
    { key: \"volume\", label: \"Volume\", align: \"right\", mono: true, sortable: false, hide: \"lg\" },
    { key: \"pe\", label: \"P/E\", align: \"right\", mono: true, sortable: true, hide: \"lg\" },
    { key: \"dividendYield\", label: \"Div %\", align: \"right\", mono: true, sortable: true, hide: \"lg\" },
    { key: \"signal\", label: \"Signal\", align: \"center\", mono: false, sortable: true },
];

function SortIcon({ col, sortKey, sortDir }) {
    if (col !== sortKey) return <ChevronsUpDown className=\"w-3 h-3 opacity-30\" />;
    return sortDir === \"asc\" ? <ChevronUp className=\"w-3 h-3 text-primary\" /> : <ChevronDown className=\"w-3 h-3 text-primary\" />;
}

function parseMarketCap(str) {
    if (!str) return 0;
    const num = parseFloat(str);
    if (str.endsWith(\"T\")) return num * 1000;
    if (str.endsWith(\"B\")) return num;
    return num / 1000;
}

export default function ScreenerTable({ results, sortKey, sortDir, onSort }) {
    const navigate = useNavigate();

    const hideClass = { sm: \"hidden sm:table-cell\", md: \"hidden md:table-cell\", lg: \"hidden lg:table-cell\" };

    return (
        <div className=\"bg-card border border-border rounded-lg overflow-x-auto\">
            <table className=\"w-full text-xs\">
                <thead>
                    <tr className=\"border-b border-border text-[10px] text-muted-foreground uppercase tracking-wider\">
                        {COLUMNS.map((col) => (
                            <th
                                key={col.key}
                                className={cn(
                                    \"px-3 py-2.5 font-semibold select-none\",
                                    col.align === \"right\" ? \"text-right\" : col.align === \"center\" ? \"text-center\" : \"text-left\",
                                    col.hide && hideClass[col.hide],
                                    col.sortable && \"cursor-pointer hover:text-foreground transition-colors\"
                                )}
                                onClick={() => col.sortable && onSort(col.key)}
                            >
                                <span className=\"inline-flex items-center gap-1\">
                                    {col.label}
                                    {col.sortable && <SortIcon col={col.key} sortKey={sortKey} sortDir={sortDir} />}
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {results.length === 0 && (
                        <tr>
                            <td colSpan={COLUMNS.length} className=\"text-center py-10 text-muted-foreground text-xs\">
                                No assets match the current filters.
                            </td>
                        </tr>
                    )}
                    {results.map((item) => (
                        <tr
                            key={item.id}
                            onClick={() => navigate(`/asset/${item.ticker}`)}
                            className=\"border-b border-border/50 hover:bg-accent/40 cursor-pointer transition-colors last:border-0\"
                        >
                            <td className=\"px-3 py-2.5 font-mono font-semibold text-primary\">{item.ticker}</td>
                            <td className=\"px-3 py-2.5 text-muted-foreground hidden sm:table-cell max-w-[180px] truncate\">{item.name}</td>
                            <td className=\"px-3 py-2.5 hidden md:table-cell\">
                                <span className=\"text-[10px] uppercase px-1.5 py-0.5 rounded bg-muted text-muted-foreground\">{item.type}</span>
                            </td>
                            <td className=\"px-3 py-2.5 hidden lg:table-cell text-muted-foreground\">{item.sector}</td>
                            <td className=\"px-3 py-2.5 text-right font-mono\">${item.price.toFixed(2)}</td>
                            <td className=\"px-3 py-2.5 text-right\">
                                <span className={cn(\"font-mono\", item.pctChange >= 0 ? \"text-emerald-400\" : \"text-red-400\")}>
                                    {item.pctChange >= 0 ? \"+\" : \"\"}{item.pctChange.toFixed(2)}%
                                </span>
                            </td>
                            <td className=\"px-3 py-2.5 text-right font-mono text-muted-foreground hidden md:table-cell\">{item.marketCap}</td>
                            <td className=\"px-3 py-2.5 text-right font-mono text-muted-foreground hidden lg:table-cell\">{item.volume}</td>
                            <td className=\"px-3 py-2.5 text-right font-mono text-muted-foreground hidden lg:table-cell\">{item.pe ?? \"—\"}</td>
                            <td className=\"px-3 py-2.5 text-right font-mono text-muted-foreground hidden lg:table-cell\">{item.dividendYield}%</td>
                            <td className=\"px-3 py-2.5 text-center\"><SignalBadge signal={item.signal} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export { parseMarketCap };
