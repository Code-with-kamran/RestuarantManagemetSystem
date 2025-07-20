"use client";

import { createContext, useContext, useState,  useEffect,} from "react";

interface SidebarContextProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  userRole: string;
  setUserRole: (role: string) => void;
  onPageChange:(page: string) => void
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState("login");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setCurrentPage("dashboard");
    }
  }, []);

  const onPageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <SidebarContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        sidebarOpen,
        setSidebarOpen,
        userRole,
        setUserRole,
        onPageChange,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};


export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
}
