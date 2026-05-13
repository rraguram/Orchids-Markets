import React from \"react\";
import { TrendingUp, TrendingDown } from \"lucide-react\";
import { cn } from \"@/lib/utils\";

export default function PriceChange({ value, percent, className }) {\n    const isPositive = value >= 0;\n\n    return (\n        <div className={cn(\"flex items-center gap-1.5\", isPositive ? \"text-emerald-400\" : \"text-red-400\", className)}>\n            {isPositive ? <TrendingUp className=\"w-3 h-3\" /> : <TrendingDown className=\"w-3 h-3\" />}\n            <span className=\"font-mono font-bold\">\n                {isPositive ? \"+\" : \"\"}{value.toFixed(2)} ({isPositive ? \"+\" : \"\"}{percent.toFixed(2)}%)\n            </span>\n        </div>\n    );\n}
