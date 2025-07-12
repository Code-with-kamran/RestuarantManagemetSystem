'use client';
import AddProductPage from '@/components/pages/Inputform';
import { SidebarProvider, useSidebarContext, getPageTitle } from "@/app/page";
import { Sidebar } from "@/components/common/Sidebar";
import { Header } from "@/components/common/Header";
import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";

const Inputfromuser = () => {
  const { currentPage, setCurrentPage, sidebarOpen, setSidebarOpen, userRole } =
    useSidebarContext();
  return (
    <>
    <ThemeProvider>
           
          <SidebarProvider>
            <div className="flex min-h-screen text-foreground">
              
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
                <AddProductPage />
              </div>
            </div>
          </SidebarProvider>
          </ThemeProvider>
    
    </>
  );
}

export default Inputfromuser;
