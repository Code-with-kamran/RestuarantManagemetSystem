// src/app/layout.tsx

"use client";

import "@/app/globals.css";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/context/SidebarContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { getPageTitle } from "@/lib/getPageTitle";
import { useSidebarContext } from "@/context/SidebarContext";
import { Providers } from "./Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPOS = pathname === "/pos";
  const isLogin = pathname === "/"; // Corrected variable name for clarity

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen" suppressHydrationWarning>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          {isLogin || isPOS ? (
            // For Login and POS pages, render only the children wrapped in SidebarProvider
            // The SidebarProvider needs to be present even if Sidebar/Header are not rendered,
            // because components on these pages (like Home, which uses useSidebarContext)
            // might still rely on its context for shared state (e.g., currentPage, userRole).
            <SidebarProvider> {/* Corrected: Changed 'sidebarProvider' to 'SidebarProvider' (uppercase S) */}
              {children}
            </SidebarProvider>
          ) : (
            // For all other pages, render the full dashboard layout with Sidebar and Header
            <SidebarProvider>
              <div className="flex h-full">
                <SidebarWrapper />
                <div className="flex-1 flex flex-col">
                  <HeaderWrapper />
                  <main className="flex-1 overflow-hidden">{children}</main>
                </div>
              </div>
            </SidebarProvider>
          )}
        </Providers>
      </body>
    </html>
  );
}

// Separate wrappers to consume context and pass props
function SidebarWrapper() {
  const { currentPage, onPageChange, sidebarOpen, setSidebarOpen } =
    useSidebarContext();

  return (
    <Sidebar
      currentPage={currentPage}
      onPageChange={onPageChange}
      isOpen={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
    />
  );
}

function HeaderWrapper() {
  const { currentPage, userRole, setSidebarOpen } = useSidebarContext();

  return (
    <Header
      title={getPageTitle(currentPage)}
      userRole={userRole}
      onMenuToggle={() => setSidebarOpen(true)}
    />
  );
}