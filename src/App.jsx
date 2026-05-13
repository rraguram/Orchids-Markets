import React from \"react\";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from \"react-router-dom\";
import AppLayout from \"@/components/layout/AppLayout\";
import Dashboard from \"@/pages/Dashboard\";
import Markets from \"@/pages/Markets\";
import Portfolio from \"@/pages/Portfolio\";
import Screener from \"@/pages/Screener\";
import AIInsights from \"@/pages/AIInsights\";
import News from \"@/pages/News\";
import Watchlists from \"@/pages/Watchlists\";
import Alerts from \"@/pages/Alerts\";
import Social from \"@/pages/Social\";
import Compare from \"@/pages/Compare\";
import AssetDetail from \"@/pages/AssetDetail\";
import Settings from \"@/pages/Settings\";
import PageNotFound from \"@/lib/PageNotFound\";
import { UserProvider } from \"@/lib/UserContext\";
import { AlertProvider } from \"@/lib/AlertContext\";
import { AuthProvider } from \"@/lib/AuthContext\";

function App() {
    return (
        <AuthProvider>
            <UserProvider>
                <AlertProvider>
                    <Router>
                        <Routes>
                            <Route path=\"/\" element={<AppLayout />}>
                                <Route index element={<Dashboard />} />
                                <Route path=\"markets\" element={<Markets />} />
                                <Route path=\"portfolio\" element={<Portfolio />} />
                                <Route path=\"screener\" element={<Screener />} />
                                <Route path=\"ai-insights\" element={<AIInsights />} />
                                <Route path=\"news\" element={<News />} />
                                <Route path=\"watchlists\" element={<Watchlists />} />
                                <Route path=\"alerts\" element={<Alerts />} />
                                <Route path=\"social\" element={<Social />} />
                                <Route path=\"compare\" element={<Compare />} />
                                <Route path=\"asset/:ticker\" element={<AssetDetail />} />
                                <Route path=\"settings\" element={<Settings />} />
                                <Route path=\"*\" element={<PageNotFound />} />
                            </Route>
                        </Routes>
                    </Router>
                </AlertProvider>
            </UserProvider>
        </AuthProvider>
    );
}

export default App;
