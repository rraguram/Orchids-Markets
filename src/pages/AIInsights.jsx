import React, { useState } from \"react\";
import { base44 } from '@/api/base44Client';
import { Card, CardHeader, CardTitle, CardContent } from \"@/components/ui/card\";
import { Button } from \"@/components/ui/button\";
import { Input } from \"@/components/ui/input\";
import { Sparkles, Brain, Search, Clock, ExternalLink, TrendingUp, Info } from \"lucide-react\";
import { cn } from \"@/lib/utils\";
import ReactMarkdown from 'react-markdown';

export default function AIInsights() {
    const [tickers, setTickers] = useState(\"NVDA, AAPL, MSFT\");
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const analyze = async () => {
        setLoading(true);
        setError(null);
        try {
            const buildPrompt = () => `
                Provide a detailed financial market analysis for the following assets: ${tickers}.
                Include:
                1. Recent price performance trends.
                2. Key fundamental metrics comparison.
                3. Market sentiment and recent news impact.
                4. Technical outlook (support/resistance).
                5. A concise 'Verdict' for each.
                Format the response in clear Markdown with headers.
            `;

            const data = await base44.integrations.Gemini.Invoke({
                add_context_from_internet: true,
                prompt: buildPrompt(),
                response_json_schema: {
                    type: \"object\",
                    properties: {
                        analysis: { type: \"string\" },
                        sentiment_score: { type: \"number\" },
                        key_risks: { type: \"array\", items: { type: \"string\" } }
                    }
                }
            });

            setInsights(data);
        } catch (err) {
            console.error(\"AI Analysis failed:\", err);
            setError(\"Failed to generate insights. Please check your connection and try again.\");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=\"max-w-5xl mx-auto space-y-6\">
            {/* Hero Header */}
            <div className=\"relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/40 via-background to-background border border-border/40 p-8 shadow-2xl\">
                <div className=\"absolute top-0 right-0 p-12 opacity-10\">\n                    <Brain size={160} className=\"text-primary animate-pulse\" />\n                </div>
                <div className=\"relative z-10 space-y-4 max-w-2xl\">\n                    <div className=\"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest\">\n                        <Sparkles className=\"w-3 h-3\" /> Intelligence Powered Analysis\n                    </div>\n                    <h1 className=\"text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground\">\n                        AI Market Insights (Gemini)\n                    </h1>\n                    <p className=\"text-muted-foreground text-lg leading-relaxed\">\n                        Leverage Gemini 3 Flash to generate real-time, internet-aware fundamental and technical analysis for any ticker in your watchlist.\n                    </p>\n                </div>
            </div>

            {/* Input Section */}
            <Card className=\"border-border/40 shadow-lg bg-card/50 backdrop-blur-md\">\n                <CardContent className=\"p-6\">\n                    <div className=\"flex flex-col md:flex-row gap-4 items-end\">\n                        <div className=\"flex-1 space-y-2\">\n                            <label className=\"text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1\">Enter Tickers (comma separated)</label>\n                            <div className=\"relative group\">\n                                <Search className=\"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors\" />\n                                <Input\n                                    value={tickers}\n                                    onChange={(e) => setTickers(e.target.value)}\n                                    className=\"pl-10 h-12 bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 transition-all text-base\"\n                                    placeholder=\"e.g. NVDA, AAPL, BTC\"\n                                />\n                            </div>\n                        </div>\n                        <Button\n                            onClick={analyze}\n                            disabled={loading || !tickers.trim()}\n                            className=\"h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all active:scale-95\"\n                        >\n                            {loading ? (\n                                <><Clock className=\"w-4 h-4 animate-spin mr-2\" /> Generating...</>\n                            ) : (\n                                <><TrendingUp className=\"w-4 h-4 mr-2\" /> Generate Insights</>\n                            )}\n                        </Button>\n                    </div>\n                </CardContent>\n            </Card>

            {/* Error State */}
            {error && (\n                <div className=\"p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2\">\n                    <Info className=\"w-4 h-4\" /> {error}\n                </div>\n            )}

            {/* Results Section */}
            {insights && (\n                <div className=\"grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-500\">\n                    {/* Main Analysis */}
                    <Card className=\"lg:col-span-2 border-border/40 shadow-xl bg-card/40 backdrop-blur-xl\">\n                        <CardHeader className=\"border-b border-border/20 pb-4\">\n                            <div className=\"flex items-center justify-between\">\n                                <CardTitle className=\"text-xl font-bold flex items-center gap-2\">\n                                    <Sparkles className=\"w-5 h-5 text-primary\" /> Deep Analysis\n                                </CardTitle>\n                                <Button variant=\"ghost\" size=\"sm\" className=\"text-[10px] uppercase font-bold text-muted-foreground\">\n                                    <ExternalLink className=\"w-3 h-3 mr-1.5\" /> Export Report\n                                </Button>\n                            </div>\n                        </CardHeader>\n                        <CardContent className=\"p-8 prose prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground prose-strong:text-primary\">\n                            <ReactMarkdown>{insights.analysis}</ReactMarkdown>\n                        </CardContent>\n                        <div className=\"px-8 py-4 bg-muted/20 border-t border-border/10\">\n                            <p className=\"text-[10px] text-muted-foreground italic\">\n                                Powered by Gemini • Analysis generated with real-time internet context • Financial markets are volatile; use with caution.\n                            </p>\n                        </div>\n                    </Card>\n\n                    {/* Side Panel: Metrics */}\n                    <div className=\"space-y-6\">\n                        {/* Sentiment Score */}\n                        <Card className=\"border-border/40 shadow-lg bg-card/60 overflow-hidden\">\n                            <CardContent className=\"p-6\">\n                                <div className=\"text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4\">Market Sentiment</div>\n                                <div className=\"flex items-end gap-3\">\n                                    <span className=\"text-5xl font-black text-primary\">{insights.sentiment_score}/10</span>\n                                    <span className=\"text-sm text-emerald-500 font-bold mb-1.5\">Bullish</span>\n                                </div>\n                                <div className=\"mt-4 h-2 w-full bg-muted rounded-full overflow-hidden\">\n                                    <div \n                                        className=\"h-full bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 transition-all duration-1000 ease-out\"\n                                        style={{ width: `${insights.sentiment_score * 10}%` }}\n                                    />\n                                </div>\n                            </CardContent>\n                        </Card>\n\n                        {/* Risks */}\n                        <Card className=\"border-border/40 shadow-lg bg-card/60\">\n                            <CardContent className=\"p-6\">\n                                <div className=\"text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4\">Key Risks Identified</div>\n                                <div className=\"space-y-3\">\n                                    {insights.key_risks.map((risk, i) => (\n                                        <div key={i} className=\"flex items-start gap-3 text-sm p-3 rounded-lg bg-background/40 border border-border/20 hover:border-primary/30 transition-colors\">\n                                            <div className=\"w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.5)]\" />\n                                            <span className=\"text-muted-foreground leading-relaxed\">{risk}</span>\n                                        </div>\n                                    ))}\n                                </div>\n                            </CardContent>\n                        </Card>\n\n                        {/* Disclaimer */}\n                        <div className=\"p-4 rounded-2xl bg-muted/30 border border-border/20 text-[11px] text-muted-foreground leading-relaxed\">\n                            <span className=\"font-bold text-foreground block mb-1 uppercase tracking-tighter\">Disclaimer:</span>\n                            AI-generated insights are for informational purposes only and do not constitute financial advice. Always verify with official sources and consult a financial advisor before making investment decisions.\n                        </div>\n                    </div>\n                </div>\n            )}\n\n            {/* Empty State */}\n            {!insights && !loading && (\n                <div className=\"py-20 flex flex-col items-center justify-center text-center space-y-4 opacity-40\">\n                    <div className=\"p-6 rounded-full bg-muted/20\">\n                        <Sparkles size={48} className=\"text-muted-foreground\" />\n                    </div>\n                    <div>\n                        <h3 className=\"text-lg font-semibold\">Ready for Analysis</h3>\n                        <p className=\"text-sm text-muted-foreground max-w-xs mx-auto\">\n                            Enter one or more tickers above to get AI-powered insights for your portfolio.\n                        </p>\n                    </div>\n                </div>\n            )}\n        </div>\n    );\n}
