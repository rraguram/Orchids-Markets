import React, { useState } from \"react\";
import { Card, CardContent } from \"@/components/ui/card\";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from \"@/components/ui/select\";
import { Slider } from \"@/components/ui/slider\";
import { Button } from \"@/components/ui/button\";
import { Input } from \"@/components/ui/input\";
import { SlidersHorizontal, RotateCcw, Save, Bookmark } from \"lucide-react\";
import { cn } from \"@/lib/utils\";

export const DEFAULT_FILTERS = {
    search: \"\",
    type: \"all\",
    signal: \"all\",
    sector: \"all\",
    geography: \"all\",
    minPctChange: [-10],
    maxPctChange: [10],
    minMarketCapB: [0],
    maxPE: [100],
    minDividend: [0],
    minVolumeM: [0],
};

function FilterLabel({ children }) {
    return (
        <label className=\"text-[10px] text-muted-foreground uppercase tracking-wider font-semibold block mb-1.5\">
            {children}
        </label>
    );
}

export default function ScreenerFilters({ filters, onChange, presets, onSavePreset, onLoadPreset, onReset }) {
    const [presetName, setPresetName] = React.useState(\"\");
    const [showPresetInput, setShowPresetInput] = React.useState(false);

    const set = (key, val) => onChange({ ...filters, [key]: val });

    const handleSave = () => {
        if (!presetName.trim()) return;
        onSavePreset(presetName.trim());
        setPresetName(\"\");
        setShowPresetInput(false);
    };

    const sectors = [\"all\", \"Technology\", \"Financial\", \"Healthcare\", \"Consumer Cyclical\", \"Industrial\", \"Large Blend\", \"Large Growth\", \"Foreign Large Blend\", \"Foreign Large Growth\", \"Mid-Cap Growth\"];

    return (
        <Card className=\"bg-card border-border\">
            <CardContent className=\"px-4 pt-4 pb-4 space-y-4\">
                {/* Header row */}
                <div className=\"flex items-center justify-between gap-2 flex-wrap\">
                    <div className=\"flex items-center gap-1.5 text-sm font-semibold text-muted-foreground\">
                        <SlidersHorizontal className=\"w-4 h-4\" /> Filters
                    </div>
                    <div className=\"flex items-center gap-1.5 flex-wrap\">
                        {/* Saved presets */}
                        {presets.length > 0 && (
                            <div className=\"flex items-center gap-1\">
                                {presets.map((p) => (
                                    <button
                                        key={p.name}
                                        onClick={() => onLoadPreset(p)}
                                        className=\"flex items-center gap-1 px-2 py-1 text-[10px] font-medium rounded border border-border bg-muted hover:bg-accent hover:text-foreground text-muted-foreground transition-colors\"
                                    >
                                        <Bookmark className=\"w-2.5 h-2.5\" /> {p.name}
                                    </button>
                                ))}
                            </div>
                        )}
                        {showPresetInput ? (
                            <div className=\"flex items-center gap-1\">
                                <Input
                                    value={presetName}
                                    onChange={(e) => setPresetName(e.target.value)}
                                    onKeyDown={(e) => e.key === \"Enter\" && handleSave()}
                                    placeholder=\"Preset name…\"
                                    className=\"h-7 text-xs w-32\"
                                    autoFocus
                                />
                                <Button size=\"sm\" className=\"h-7 text-[10px] px-2\" onClick={handleSave}>Save</Button>
                                <Button size=\"sm\" variant=\"ghost\" className=\"h-7 text-[10px] px-2\" onClick={() => setShowPresetInput(false)}>✕</Button>
                            </div>
                        ) : (
                            <Button variant=\"outline\" size=\"sm\" className=\"h-7 text-[10px] gap-1\" onClick={() => setShowPresetInput(true)}>
                                <Save className=\"w-3 h-3\" /> Save Preset
                            </Button>
                        )}
                        <Button variant=\"ghost\" size=\"sm\" className=\"h-7 text-[10px] gap-1 text-muted-foreground\" onClick={onReset}>
                            <RotateCcw className=\"w-3 h-3\" /> Reset
                        </Button>
                    </div>
                </div>

                {/* Row 1: search + dropdowns */}
                <div className=\"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3\">
                    <div className=\"col-span-2 sm:col-span-1 md:col-span-1\">
                        <FilterLabel>Search</FilterLabel>
                        <Input
                            value={filters.search}
                            onChange={(e) => set(\"search\", e.target.value)}
                            placeholder=\"Ticker or name…\"
                            className=\"h-8 text-xs\"
                        />
                    </div>
                    <div>
                        <FilterLabel>Type</FilterLabel>
                        <Select value={filters.type} onValueChange={(v) => set(\"type\", v)}>
                            <SelectTrigger className=\"h-8 text-xs\"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value=\"all\">All</SelectItem>
                                <SelectItem value=\"stock\">Stocks</SelectItem>
                                <SelectItem value=\"etf\">ETFs</SelectItem>
                                <SelectItem value=\"fund\">Funds</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <FilterLabel>Signal</FilterLabel>
                        <Select value={filters.signal} onValueChange={(v) => set(\"signal\", v)}>
                            <SelectTrigger className=\"h-8 text-xs\"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value=\"all\">All Signals</SelectItem>
                                <SelectItem value=\"Strong Buy\">Strong Buy</SelectItem>
                                <SelectItem value=\"Buy\">Buy</SelectItem>
                                <SelectItem value=\"Hold\">Hold</SelectItem>
                                <SelectItem value=\"Sell\">Sell</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <FilterLabel>Sector</FilterLabel>
                        <Select value={filters.sector} onValueChange={(v) => set(\"sector\", v)}>
                            <SelectTrigger className=\"h-8 text-xs\"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {sectors.map((s) => <SelectItem key={s} value={s}>{s === \"all\" ? \"All Sectors\" : s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <FilterLabel>Geography</FilterLabel>
                        <Select value={filters.geography} onValueChange={(v) => set(\"geography\", v)}>
                            <SelectTrigger className=\"h-8 text-xs\"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value=\"all\">All</SelectItem>
                                <SelectItem value=\"US\">US</SelectItem>
                                <SelectItem value=\"International\">International</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Row 2: sliders */}
                <div className=\"grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4\">
                    <div>
                        <FilterLabel>
                            Day Change: <span className=\"font-mono text-foreground\">{filters.minPctChange[0]}% → {filters.maxPctChange[0]}%</span>
                        </FilterLabel>
                        <div className=\"space-y-2 mt-2\">
                            <Slider value={filters.minPctChange} onValueChange={(v) => set(\"minPctChange\", v)} min={-10} max={0} step={0.5} />
                            <Slider value={filters.maxPctChange} onValueChange={(v) => set(\"maxPctChange\", v)} min={0} max={10} step={0.5} />
                        </div>
                    </div>
                    <div>
                        <FilterLabel>
                            Min Market Cap: <span className=\"font-mono text-foreground\">${filters.minMarketCapB[0]}B+</span>
                        </FilterLabel>
                        <Slider value={filters.minMarketCapB} onValueChange={(v) => set(\"minMarketCapB\", v)} min={0} max={1000} step={10} className=\"mt-3\" />
                    </div>
                    <div>
                        <FilterLabel>
                            Max P/E: <span className=\"font-mono text-foreground\">{filters.maxPE[0]}</span>
                        </FilterLabel>
                        <Slider value={filters.maxPE} onValueChange={(v) => set(\"maxPE\", v)} min={0} max={100} step={1} className=\"mt-3\" />
                    </div>
                    <div>
                        <FilterLabel>
                            Min Dividend: <span className=\"font-mono text-foreground\">{filters.minDividend[0]}%</span>
                        </FilterLabel>
                        <Slider value={filters.minDividend} onValueChange={(v) => set(\"minDividend\", v)} min={0} max={5} step={0.1} className=\"mt-3\" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
