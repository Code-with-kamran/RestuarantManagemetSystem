"use client";

import { SidebarProvider } from "@/context/SidebarContext";
// import { getPageTitle } from "@/lib/getPageTitle";

import React, { useState, useEffect } from "react";
import Image from "next/image";
// import { Providers } from "../../Providers"
import {MOCK_PRODUCT} from "@/lib/mocks";


interface MOCK_PRODUCTSItem {
  id: string; // Changed to string based on your mock data
  name: string;
  price: number;
  category: string;
  image:string;
  description:string;
  lastupdate?:string; 
}

const MOCK_PRODUCTSPage = () => {
  const [MOCK_PRODUCTS, setMOCK_PRODUCTS] = useState<MOCK_PRODUCTSItem[]>(MOCK_PRODUCT); // Initialize as empty array
  // const [loading, setLoading] = useState<boolean>(false); // State for loading indicator
  // const [error, setError] = useState<string | null>(null); // State for error messages
  // const { currentPage, setCurrentPage, sidebarOpen, setSidebarOpen, userRole } =
    // useSidebarContext();
  // useEffect to fetch data when the component mounts
  useEffect(() => {
    // const fetchProducts = async () => {
    //   try {
    //     const response = await fetch("http://localhost:5000/MOCK_PRODUCTS");
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     const data: MOCK_PRODUCTSItem[] = await response.json();
    //     console.log(data);

    //     setMOCK_PRODUCTS(data); // Set the fetched data to the MOCK_PRODUCTS state
    //   } catch (error) {
    //     const err = error as Error;
    //     setError(err.message || "Failed to fetch products");
    //     console.error("Error fetching products:", err);
    //   } finally {
    //     setLoading(false); // Set loading to false once fetch is complete (success or error)
    //   }
    // };
    setMOCK_PRODUCTS(MOCK_PRODUCT)
    // fetchProducts();
  }, []); // Empty dependency array means this effect runs once after the initial render

  // if (loading) {
  //   return <div className="p-6 text-center text-lg">Loading MOCK_PRODUCTS...</div>;
  // }

  // if (error) {
  //   return (
  //     <div className="p-6 text-center text-red-600 text-lg">Error: {error}</div>
  //   );
  // }

  return (
    <>
   
       
      <SidebarProvider>
        <div className="flex h-[calc(100vh-100px)] overflow-auto custom-scrollbar text-foreground">
          
        
          <div className="w-full">
           
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
                    {MOCK_PRODUCTS.length > 0 ? (
                      MOCK_PRODUCTS.map((item) => (
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
      
    </>
  );
}

export default MOCK_PRODUCTSPage
