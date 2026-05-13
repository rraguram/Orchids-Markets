import React from \"react\";
import { Outlet } from \"react-router-dom\";
import Sidebar from \"@/components/layout/Sidebar\";
import TopBar from \"@/components/layout/TopBar\";
import MobileNav from \"@/components/layout/MobileNav\";
import { useMobile } from \"@/hooks/use-mobile\";

export default function AppLayout() {\n    const isMobile = useMobile();\n\n    return (\n        <div className=\"min-h-screen bg-background text-foreground flex overflow-hidden\">\n            {!isMobile && <Sidebar />}\n            \n            <div className=\"flex-1 flex flex-col relative h-screen overflow-hidden\">\n                <TopBar />\n                \n                <main className=\"flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8\">\n                    <div className=\"max-w-7xl mx-auto\">\n                        <Outlet />\n                    </div>\n                    <div className=\"h-20 md:hidden\" /> {/* Bottom nav space */}\n                </main>\n\n                {isMobile && <MobileNav />}\n            </div>\n        </div>\n    );\n}
