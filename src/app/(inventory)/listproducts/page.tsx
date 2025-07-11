'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

interface InventoryItem {
  id: string; // Changed to string based on your mock data
  name: string;
  category: string;
  price: number;
  image: string;
  lastupdate?:string // Added image field
}

const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]); // Initialize as empty array
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error messages

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/MOCK_PRODUCTS');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: InventoryItem[] = await response.json();
        console.log(data);
        
        setInventory(data); // Set the fetched data to the inventory state
      } catch (error) {
        const err = error as Error
        setError(err.message || 'Failed to fetch products');
        console.error('Error fetching products:', err);
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
    return <div className="p-6 text-center text-red-600 text-lg">Error: {error}</div>;
  }

  return (
   
    <div className="p-6">
      <div className='flex justify-between'>
          <h3>All Product</h3>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      <div className="bg-background rounded-lg shadow-md border border-border overflow-hidden">
        
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Last updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {inventory.length > 0 ? (
              inventory.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={item.image} alt={item.name} className="h-10 w-10 object-cover rounded-full" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${item.lastupdate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryPage;