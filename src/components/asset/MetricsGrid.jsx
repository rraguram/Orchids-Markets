import React from \"react\";
import { Card, CardContent } from \"@/components/ui/card\";
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, Globe } from \"lucide-react\";
import { cn } from \"@/lib/utils\";

const METRICS = [
    { label: \"Market Cap\", value: \"3.15T\", icon: Globe, color: \"blue\" },
    { label: \"P/E Ratio\", value: \"32.4\", icon: Activity, color: \"purple\" },
    { label: \"Dividend Yield\", value: \"0.65%\", icon: DollarSign, color: \"emerald\" },
    { label: \"52W High\", value: \"$198.11\", icon: TrendingUp, color: \"emerald\" },
    { label: \"52W Low\", value: \"$124.17\", icon: TrendingDown, color: \"red\" },
    { label: \"Avg Volume\", value: \"52.4M\", icon: BarChart3, color: \"orange\" },
];

export default function MetricsGrid() {
    return (
        <div className=\"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3\">\n            {METRICS.map((m) => (\n                <Card key={m.label} className=\"bg-card border-border/50\">\n                    <CardContent className=\"p-3 flex flex-col items-center justify-center text-center space-y-1.5\">\n                        <div className={cn(\"p-1.5 rounded-lg bg-muted/50\", `text-${m.color}-500`)}>\n                            <m.icon className=\"w-4 h-4\" />\n                        </div>\n                        <div className=\"space-y-0.5\">\n                            <div className=\"text-[10px] uppercase font-bold text-muted-foreground tracking-tighter\">{m.label}</div>\n                            <div className=\"text-sm font-mono font-bold\">{m.value}</div>\n                        </div>\n                    </CardContent>\n                </Card>\n            ))}\n        </div>
    );
}
