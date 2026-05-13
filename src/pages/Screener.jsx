import React, { useState, useMemo } from \"react\";
import { MARKETS_DATA } from \"@/lib/mockData\";
import { Download } from \"lucide-react\";
import { Button } from \"@/components/ui/button\";
import ScreenerFilters, { DEFAULT_FILTERS } from \"@/components/screener/ScreenerFilters\";
import ScreenerTable, { parseMarketCap } from \"@/components/screener/ScreenerTable\";

const PRESET_KEY = \"screener_presets\";

function loadPresets() {
    try { return JSON.parse(localStorage.getItem(PRESET_KEY) || \"[]\"); } catch { return []; }
}
function savePresets(presets) {
    localStorage.setItem(PRESET_KEY, JSON.stringify(presets));
}

export default function Screener() {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [sortKey, setSortKey] = useState(\"marketCapRaw\");
    const [sortDir, setSortDir] = useState(\"desc\");
    const [presets, setPresets] = useState(loadPresets);

    const handleSort = (key) => {
        setSortDir((prev) => (sortKey === key ? (prev === \"asc\" ? \"desc\" : \"asc\") : \"desc\"));
        setSortKey(key);
    };

    const handleSavePreset = (name) => {
        const next = [...presets.filter((p) => p.name !== name), { name, filters }];
        setPresets(next);
        savePresets(next);
    };

    const handleLoadPreset = (preset) => setFilters(preset.filters);
    const handleReset = () => setFilters(DEFAULT_FILTERS);

    const exportCSV = () => {
        const header = \"Ticker,Name,Type,Sector,Price,Change%,MarketCap,PE,DividendYield,Signal\";
        const rows = results.map((r) =>
            `${r.ticker},${r.name},${r.type},${r.sector},${r.price},${r.pctChange},${r.marketCap},${r.pe ?? \"\"},${r.dividendYield},${r.signal}`
        );
        const blob = new Blob([[header, ...rows].join(\"\\n\")], { type: \"text/csv\" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement(\"a\"); a.href = url; a.download = \"screener.csv\"; a.click();
    };

    const results = useMemo(() => {
        let data = MARKETS_DATA.map((d) => ({ ...d, marketCapRaw: parseMarketCap(d.marketCap) }));

        // Filter
        data = data.filter((d) => {
            if (filters.search) {
                const q = filters.search.toLowerCase();
                if (!d.ticker.toLowerCase().includes(q) && !d.name.toLowerCase().includes(q)) return false;
            }
            if (filters.type !== \"all\" && d.type !== filters.type) return false;
            if (filters.signal !== \"all\" && d.signal !== filters.signal) return false;
            if (filters.sector !== \"all\" && d.sector !== filters.sector) return false;
            if (filters.geography !== \"all\" && d.geography !== filters.geography) return false;
            if (d.pctChange < filters.minPctChange[0]) return false;
            if (d.pctChange > filters.maxPctChange[0]) return false;
            if (d.marketCapRaw < filters.minMarketCapB[0]) return false;
            if (d.pe && d.pe > filters.maxPE[0]) return false;
            if (d.dividendYield < filters.minDividend[0]) return false;
            return true;
        });

        // Sort
        data.sort((a, b) => {
            const av = a[sortKey] ?? 0;
            const bv = b[sortKey] ?? 0;
            if (typeof av === \"string\") return sortDir === \"asc\" ? av.localeCompare(bv) : bv.localeCompare(av);
            return sortDir === \"asc\" ? av - bv : bv - av;
        });

        return data;
    }, [filters, sortKey, sortDir]);

    return (
        <div className=\"space-y-4\">\n            <div className=\"flex items-center justify-between\">\n                <div>\n                    <h1 className=\"text-xl font-bold\">Screener</h1>\n                    <p className=\"text-xs text-muted-foreground mt-0.5\">{results.length} result{results.length !== 1 ? \"s\" : \"\"}</p>\n                </div>\n                <Button variant=\"outline\" size=\"sm\" className=\"h-8 text-xs gap-1.5\" onClick={exportCSV}>\n                    <Download className=\"w-3.5 h-3.5\" /> Export CSV\n                </Button>\n            </div>\n\n            <ScreenerFilters\n                filters={filters}\n                onChange={setFilters}\n                presets={presets}\n                onSavePreset={handleSavePreset}\n                onLoadPreset={handleLoadPreset}\n                onReset={handleReset}\n            />\n\n            <ScreenerTable\n                results={results}\n                sortKey={sortKey}\n                sortDir={sortDir}\n                onSort={handleSort}\n            />\n        </div>
    );
}
