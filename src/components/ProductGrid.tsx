// components/ProductGrid.tsx
'use client'
import React, { useState, useMemo,useRef,useEffect } from 'react';
import { Product } from '@/lib/mocks'; // Adjusted import
import Image from 'next/image';

interface ProductGridProps {
  products: Product[];
  categories: string[];
  addToCart: (product: Product) => void;
  searchTerm: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  categories,
  addToCart,
  searchTerm,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredProducts = useMemo(() => {
    let currentProducts = products;

    if (searchTerm) {
      currentProducts = currentProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All Categories") {
      currentProducts = currentProducts.filter((p) => p.category === selectedCategory);
    }

    return currentProducts;
  }, [products, selectedCategory, searchTerm]);

  const HorizontalScroll = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null); 

    useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;

      const onWheel = (e: WheelEvent) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        }
      };

      el.addEventListener('wheel', onWheel, { passive: false });

      return () => {
        el.removeEventListener('wheel', onWheel);
      };
    }, []);

    return (
      <div className="h-[calc(100vh-100px)] flex-1 py-4 pl-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col  overflow-auto">
        {/* Category Filters */}
        <div
        ref={scrollRef} className="w-11/12 flex overflow-x-auto gap-2 mb-4  hide-scrollbar">
          <button
            onClick={() => setSelectedCategory("All Categories")}
            className={`p-4 whitespace-nowrap  rounded-full text-sm font-semibold transition duration-200
              ${
                selectedCategory === "All Categories"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap p-4  rounded-full text-sm font-semibold transition duration-200
                ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-auto pt-4 px-4 flex-grow custom-scrollbar">
          {Array.isArray(filteredProducts) && filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
              No products found matching your criteria.
            </div>
          ) : (
            filteredProducts.map((item) => (
              <div
                key={item.id}
                className="rounded-lg bg-gray-50 dark:bg-gray-700 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden h-[12rem]"
                onClick={() => addToCart(item)}
              >
                <div className="relative">
                  <Image
                    src={item.image || "https://img.freepik.com/free-photo/top-view-table-full-food_23-2149209253.jpg"}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="w-full h-28 sm:h-32 object-cover rounded-t-lg"
                  />
                  <p className="text-white px-2 py-1 bg-blue-600 rounded-br-lg font-semibold absolute top-0 left-0 text-sm">
                    Rs{item.price.toFixed(2)}
                  </p>
                  <p className="text-white px-2 py-1 bg-red-400 rounded-bl-lg font-semibold absolute top-0 right-0 text-xs">
                    In Stock
                  </p>
                </div>
                <div className="p-2">
                  <center className="font-bold text-sm sm:text-base mb-1 truncate dark:text-gray-100">{item.name}</center>
                  <center className="text-xs text-gray-600 dark:text-gray-300">ID: {item.id}</center>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return <HorizontalScroll />;
};

export { ProductGrid };