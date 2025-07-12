"use client";

import { SidebarProvider, useSidebarContext, getPageTitle } from "@/app/page";
import { Sidebar } from "@/components/common/Sidebar";
import { Header } from "@/components/common/Header";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ThemeProvider } from "@/context/ThemeContext";
import Head from "next/head";


interface InventoryItem {
  id: string; // Changed to string based on your mock data
  name: string;
  category: string;
  price: number;
  image: string;
  lastupdate?: string; // Added image field
}

const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]); // Initialize as empty array
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error messages
  const { currentPage, setCurrentPage, sidebarOpen, setSidebarOpen, userRole } =
    useSidebarContext();
  // useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/MOCK_PRODUCTS");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: InventoryItem[] = await response.json();
        console.log(data);

        setInventory(data); // Set the fetched data to the inventory state
      } catch (error) {
        const err = error as Error;
        setError(err.message || "Failed to fetch products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false); // Set loading to false once fetch is complete (success or error)
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return <div className="p-6 text-center text-lg">Loading inventory...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 text-lg">Error: {error}</div>
    );
  }

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
            <div className="p-6">
              <div className="flex justify-between">
                <h3>All Product</h3>
                
              </div>
              <div className="bg-background rounded-lg shadow-md border border-border overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Last updated
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {inventory.length > 0 ? (
                      inventory.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}

                              className="h-10 w-10 object-cover rounded-full"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ${item.lastupdate}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          No products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
      </ThemeProvider>
    </>
  );
};

export default InventoryPage;
