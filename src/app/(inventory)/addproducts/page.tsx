// 'use client'

//  import React, { useState } from 'react';

// // Main App component to host the InventoryForm
// const App = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
//       <InventoryForm />
//     </div>
//   );
// };

// // InventoryForm component
// const InventoryForm = () => {
//   // State for each form field
//   const [name, setName] = useState('');
//   const [category, setCategory] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [price, setPrice] = useState('');
//   // State for messages (success/error)
//   const [message, setMessage] = useState<string | null >(null);
//   const [isError, setIsError] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Function to handle form submission
//   const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // Prevent default form submission behavior (page reload)

//     setIsSubmitting(true);
//     setMessage(null); // Clear previous messages
//     setIsError(false);

//     // Construct the inventory item object based on the desired structure
//     const inventoryItem = {
//       name,
//       category,
//       quantity: parseInt(quantity, 10), // Convert quantity to integer
//       price: parseFloat(price),         // Convert price to float
//       lastUpdated: new Date().toISOString() // Set current ISO date string for lastUpdated
//     };

//     // Define the endpoint for the POST request
//     // IMPORTANT: Replace this with your actual backend endpoint when ready.
//     // For local development, if you set up json-server, this might be 'http://localhost:3001/inventory'
//     const endpoint = 'http://localhost:3001/menuItems'; // A public test API for demonstration

//     try {
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // 'Accept': 'application/json' // Often good to include, but not strictly required for JSONPlaceholder
//         },
//         body: JSON.stringify(inventoryItem), // Convert JavaScript object to JSON string
//       });

//       // Check if the request was successful
//       if (response.ok) {
//         // Parse the JSON response from the server
//         const data = await response.json();
//         setMessage(`Item "${data.name || 'Unnamed Item'}" added successfully! (ID: ${data.id || 'N/A'})`);
//         setIsError(false);
//         // Optionally, clear the form fields after successful submission
//         setName('');
//         setCategory('');
//         setQuantity('');
//         setPrice('');
//       } else {
//         // Handle HTTP errors (e.g., 400, 500)
//         const errorData = await response.json(); // Try to get error details from response body
//         setMessage(`Failed to add item: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`);
//         setIsError(true);
//       }
//     } catch (error) {
//       // Handle network errors (e.g., server unreachable)
//       const err = error as Error
//       setMessage(`Network error: ${err.message}`);
//       setIsError(true);
//     } finally {
//       setIsSubmitting(false); // Re-enable the submit button
//     }
//   };

//   return (
//     <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Inventory Item</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name Input */}
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
//           <input
//             type="text"
//             id="name"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out placeholder-gray-400"
//             placeholder="e.g., Coffee Beans"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             aria-label="Item Name"
//           />
//         </div>

//         {/* Category Input */}
//         <div>
//           <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//           <input
//             type="text"
//             id="category"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out placeholder-gray-400"
//             placeholder="e.g., Beverage"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//             aria-label="Category"
//           />
//         </div>

//         {/* Quantity Input */}
//         <div>
//           <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
//           <input
//             type="number"
//             id="quantity"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out placeholder-gray-400"
//             placeholder="e.g., 25"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//             required
//             min="0"
//             aria-label="Quantity"
//           />
//         </div>

//         {/* Price Input */}
//         <div>
//           <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
//           <input
//             type="number"
//             id="price"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out placeholder-gray-400"
//             placeholder="e.g., 12.99"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//             step="0.01" // Allows decimal values
//             min="0"
//             aria-label="Price"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-200 ease-in-out
//             ${isSubmitting
//               ? 'bg-blue-400 cursor-not-allowed'
//               : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50'
//             }`}
//           disabled={isSubmitting}
//           aria-label="Add Item to Inventory"
//         >
//           {isSubmitting ? 'Adding...' : 'Add Item'}
//         </button>
//       </form>

//       {/* Message Display */}
//       {message && (
//         <div
//           className={`mt-4 p-3 rounded-lg text-sm text-center
//             ${isError ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-green-100 text-green-700 border border-green-300'}`}
//           role={isError ? "alert" : "status"}
//           aria-live="polite"
//         >
//           {message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

import AddProductPage from '@/components/pages/Inputform';
import React from 'react';

const Inputfromuser = () => {
  return (
    <div>
      <AddProductPage />
    </div>
  );
}

export default Inputfromuser;
