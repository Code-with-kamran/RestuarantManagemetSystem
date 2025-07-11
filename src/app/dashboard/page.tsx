'use client'
import { Dashboard } from "@/components/pages/Dashboard";
import React from "react";
import { getPageTitle, useSidebarContext } from "../page";
import { Sidebar } from "@/components/common/Sidebar";
import { SidebarProvider } from "../page";
import { Header } from "@/components/common/Header";
const Dashboardpage = () => {
  const {currentPage,setCurrentPage,sidebarOpen,setSidebarOpen,userRole } = useSidebarContext()
  // const {getPageTitle, userRole,setSidebaropen} =
  return (
    <SidebarProvider>
    
      <div className="flex h-screen text-foreground">
        <Sidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          
        />
      <div className="w-full">
        <Header 
                    title={getPageTitle(currentPage)}
                    userRole={userRole}
                    onMenuToggle={() => setSidebarOpen(true)}
                  />
        <Dashboard />
      </div>

      </div>
    
    </SidebarProvider>
  );
};

export default Dashboardpage;
