import React from \"react\";
import { cn } from \"@/lib/utils\";

export default function SignalBadge({ signal }) {\n    const styles = {\n        \"Strong Buy\": \"bg-emerald-500/10 text-emerald-500 border-emerald-500/20\",\n        \"Buy\": \"bg-emerald-400/10 text-emerald-400 border-emerald-400/20\",\n        \"Hold\": \"bg-muted text-muted-foreground border-border\",\n        \"Sell\": \"bg-red-400/10 text-red-400 border-red-400/20\",\n        \"Strong Sell\": \"bg-red-500/10 text-red-500 border-red-500/20\",\n    };\n\n    return (\n        <span className={cn(\n            \"px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border\",\n            styles[signal] || styles[\"Hold\"]\n        )}>\n            {signal}\n        </span>\n    );\n}
