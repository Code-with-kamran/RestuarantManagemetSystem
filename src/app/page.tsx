'use client'
import { SidebarProvider, useSidebarContext } from "@/context/SidebarContext";
import { Login } from "@/components/Login";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Dashboard } from "@/features/dashboard/Dashboard";

export default function Home() {
  return (
    <SidebarProvider>
      <HomeWithSidebar />
    </SidebarProvider>
  );
}

function HomeWithSidebar() {
  const { currentPage } = useSidebarContext();
  const router = useRouter();
  const [localIsLoggedIn, setLocalIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLoginStatus = localStorage.getItem('isLoggedIn');
      if (storedLoginStatus === 'true') {
        setLocalIsLoggedIn(true);
      }
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        router.push("/dashboard");
        return null;
      case "pos":
        router.push("/pos");
        return null;
      case "orders":
        router.push("/order");
        return null;
      case "inventory":
        router.push("/analytics");
        return null;
      default:
        router.push("/dashboard");
        return null;
    }
  };

  if (!localIsLoggedIn) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {currentPage === "dashboard" && <Dashboard />}
        {renderPage()}
      </main>
    </div>
  );
}
