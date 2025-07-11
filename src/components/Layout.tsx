// components/Layout.tsx
'use client';
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { DollarSign, Printer, Tag, Search } from 'lucide-react';

const Layout = () => {
  const { cart, addToCart, total, clearCart } = useCart();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Left - Cart */}
      <aside className="w-[350px] bg-white p-6 shadow-md flex flex-col">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        <div className="flex-1 overflow-auto">
          {cart.length === 0 ? <p className="text-gray-400">Cart is empty</p> : cart.map(item => (
            <div key={item.id} className="flex justify-between mb-2">
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="text-right text-sm">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t pt-2">
          <p className="flex justify-between font-semibold text-sm">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </p>
          <button onClick={() => setModalOpen(true)} className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            <DollarSign className="inline mr-1" size={16} /> Checkout
          </button>
        </div>
      </aside>

      {/* Right - Product Grid */}
      <main className="flex-1 bg-gray-50 p-6 overflow-auto">
        <div className="flex items-center mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-full focus:ring focus:outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
              <img src={product.image} alt={product.name} className="h-32 object-cover rounded mb-2" />
              <h3 className="text-sm font-semibold truncate">{product.name}</h3>
              <p className="text-green-600 font-bold text-lg">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-auto bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700"
              >
                Add to Cart <Tag size={14} className="inline ml-1" />
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <ul className="divide-y text-sm">
              {cart.map(item => (
                <li key={item.id} className="py-1 flex justify-between">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded text-sm">Cancel</button>
              <button
                onClick={() => {
                  alert('Printing Receipt...');
                  clearCart();
                  setModalOpen(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                <Printer size={16} className="inline mr-1" /> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
