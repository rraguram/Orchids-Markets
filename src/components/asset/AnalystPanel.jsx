import React from \"react\";
import { Card, CardHeader, CardTitle, CardContent } from \"@/components/ui/card\";
import { Progress } from \"@/components/ui/progress\";

const RECOMMENDATIONS = [
    { firm: \"Goldman Sachs\", rating: \"Buy\", target: \"150.00\", date: \"2 days ago\" },
    { firm: \"JPMorgan\", rating: \"Overweight\", target: \"145.00\", date: \"5 days ago\" },
    { firm: \"Morgan Stanley\", rating: \"Equal-weight\", target: \"130.00\", date: \"1 week ago\" },
    { firm: \"Bank of America\", rating: \"Buy\", target: \"155.00\", date: \"2 weeks ago\" },
];

export default function AnalystPanel() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className=\"text-sm font-medium\">Analyst Recommendations</CardTitle>
            </CardHeader>
            <CardContent className=\"space-y-6\">
                <div className=\"flex items-center gap-4\">\n                    <div className=\"flex-1 space-y-2\">\n                        <div className=\"flex justify-between text-xs\">\n                            <span className=\"text-muted-foreground\">Consensus Rating</span>\n                            <span className=\"font-bold text-emerald-500\">Strong Buy</span>\n                        </div>\n                        <div className=\"h-2 bg-muted rounded-full overflow-hidden flex\">\n                            <div className=\"h-full bg-emerald-500\" style={{ width: \"70%\" }} />\n                            <div className=\"h-full bg-blue-500\" style={{ width: \"20%\" }} />\n                            <div className=\"h-full bg-muted-foreground/30\" style={{ width: \"10%\" }} />\n                        </div>\n                    </div>\n                    <div className=\"text-right\">\n                        <div className=\"text-2xl font-bold\">4.7</div>\n                        <div className=\"text-[10px] text-muted-foreground uppercase\">Out of 5.0</div>\n                    </div>\n                </div>\n\n                <div className=\"space-y-3\">\n                    {RECOMMENDATIONS.map((r, i) => (\n                        <div key={i} className=\"flex items-center justify-between text-xs p-2 rounded-lg bg-muted/30\">\n                            <div>\n                                <div className=\"font-semibold\">{r.firm}</div>\n                                <div className=\"text-muted-foreground text-[10px]\">{r.date}</div>\n                            </div>\n                            <div className=\"text-right\">\n                                <div className={r.rating === \"Buy\" || r.rating === \"Overweight\" ? \"text-emerald-500 font-bold\" : \"text-foreground\"}>\n                                    {r.rating}\n                                </div>\n                                <div className=\"font-mono text-[10px]\">${r.target}</div>\n                            </div>\n                        </div>\n                    ))}\n                </div>\n            </CardContent>
        </Card>
    );
}
