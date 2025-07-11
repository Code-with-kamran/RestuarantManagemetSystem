"use client";
import { ThemeProvider } from "@/context/ThemeContext";
import { LoginScreen } from "@/components/pages/Login";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { Dashboard } from "@/components/pages/Dashboard";

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  userRole: string;
  setUserRole: (role: string) => void;
}

const SidebarPropsContext = React.createContext<SidebarProps | undefined>(
  undefined
);
// Custom hook for safer access
export const useSidebarContext = (): SidebarProps => {
  const context = useContext(SidebarPropsContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
};
// Context Provider
export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState<string>("login");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>("");

  return (
    <SidebarPropsContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        sidebarOpen,
        setSidebarOpen,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </SidebarPropsContext.Provider>
  );
};

export default function Home() {
  const {
    currentPage,
    setCurrentPage,


    setUserRole,
  } = useSidebarContext();
  const router = useRouter();

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return router.push("/dashboard");
      case "pos":
        return router.push("/pos");
      case "orders":
        return router.push("/order");
      case "inventory":
        return router.push("/analytics");
      default:
        return router.push("/dashboard");
    }
  };

  if (currentPage === "login") {
    return (
      <ThemeProvider>
        <LoginScreen
          onLogin={() => setCurrentPage("login")}
          onRoleChange={setUserRole}
        />
      </ThemeProvider>
    );
  }

  return (
    <>
      {" "}
      <Dashboard />
      <ThemeProvider>
        <div className="flex h-screen bg-background text-foreground">
          {/* <Sidebar 
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            title={getPageTitle(currentPage)}
            userRole={userRole}
            onMenuToggle={() => setSidebarOpen(true)}
          /> */}

          <main className="flex-1 overflow-y-auto">{renderPage()}</main>
        </div>
      </ThemeProvider>
    </>
  );
}

export function getPageTitle(page: string): string {
  const titles: Record<string, string> = {
    dashboard: "Dashboard",
    pos: "POS System",
    orders: "Orders",
    inventory: "Inventory Management",
    staff: "Staff Management",
    settings: "Settings",
  };
  return titles[page] || "Dashboard";
}
