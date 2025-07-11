'use client'
import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingCart, Search, X, Scan, DollarSign, Printer, Tag, Minus, Plus, RefreshCcw, Eye, Hand,
  FileText, List, SlidersHorizontal, CheckCircle, CreditCard, Receipt, Percent, Truck, ChevronLeft, ChevronRight, Settings,
  ChevronDown, Info, History
} from 'lucide-react';

// --- Data Interfaces ---
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem {
  id: string; // Product ID
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Category {
  id: string;
  name: string;
  itemCount: number; // Added for category item count
}

// --- Mock Data ---
const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Tikka Burger', price: 250.0, category: 'Burgers', image: 'https://placehold.co/100x100/A0D9B0/000000?text=Burger' },
  { id: 'p2', name: 'Zinger Combo', price: 450.0, category: 'Fast Food', image: 'https://placehold.co/100x100/FFD700/000000?text=Zinger' },
  { id: 'p3', name: 'Pepsi 1.5L', price: 120.0, category: 'Drinks', image: 'https://placehold.co/100x100/ADD8E6/000000?text=Pepsi' },
  { id: 'p4', name: 'Chicken Pizza', price: 800.0, category: 'Pizza', image: 'https://placehold.co/100x100/FFB3BA/000000?text=Pizza' },
  { id: 'p5', name: 'French Fries', price: 150.0, category: 'Sides', image: 'https://placehold.co/100x100/BAFFC9/000000?text=Fries' },
  { id: 'p6', name: 'Coke Can', price: 80.0, category: 'Drinks', image: 'https://placehold.co/100x100/CBAACB/000000?text=Coke' },
  { id: 'p7', name: 'Veggie Burger', price: 200.0, category: 'Burgers', image: 'https://placehold.co/100x100/D1E7DD/000000?text=Veggie' },
  { id: 'p8', name: 'Onion Rings', price: 180.0, category: 'Sides', image: 'https://placehold.co/100x100/F0E68C/000000?text=Rings' },
  { id: 'p9', name: 'Mineral Water', price: 50.0, category: 'Drinks', image: 'https://placehold.co/100x100/F8D8C2/000000?text=Water' },
  { id: 'p10', name: 'Pepperoni Pizza', price: 950.0, category: 'Pizza', image: 'https://placehold.co/100x100/B2D8D8/000000?text=Pepperoni' },
  // Adding more products to justify category counts
  { id: 'p11', name: 'Wireless Headset', price: 300.0, category: 'Headphones', image: 'https://placehold.co/100x100/E6E6FA/000000?text=Headset' },
  { id: 'p12', name: 'Gaming Headphones', price: 500.0, category: 'Headphones', image: 'https://placehold.co/100x100/DDA0DD/000000?text=Gaming' },
  { id: 'p13', name: 'Running Shoes', price: 800.0, category: 'Shoes', image: 'https://placehold.co/100x100/F0F8FF/000000?text=Shoes' },
  { id: 'p14', name: 'Formal Shoes', price: 1200.0, category: 'Shoes', image: 'https://placehold.co/100x100/FAFAD2/000000?text=Formal' },
  { id: 'p15', name: 'Smart Phone', price: 15000.0, category: 'Mobiles', image: 'https://placehold.co/100x100/FFE4E1/000000?text=Phone' },
  { id: 'p16', name: 'Feature Phone', price: 2000.0, category: 'Mobiles', image: 'https://placehold.co/100x100/FFDEAD/000000?text=Mobile' },
  { id: 'p17', name: 'Smart Watch', price: 7000.0, category: 'Watches', image: 'https://placehold.co/100x100/E0FFFF/000000?text=Watch' },
  { id: 'p18', name: 'Classic Watch', price: 4000.0, category: 'Watches', image: 'https://placehold.co/100x100/F5DEB3/000000?text=Classic' },
  { id: 'p19', name: 'Gaming Laptop', price: 150000.0, category: 'Laptops', image: 'https://placehold.co/100x100/F5F5DC/000000?text=Laptop' },
  { id: 'p20', name: 'Office Laptop', price: 80000.0, category: 'Laptops', image: 'https://placehold.co/100x100/FDF5E6/000000?text=Office' },
  { id: 'p21', name: 'Diet Coke', price: 90.0, category: 'Drinks', image: 'https://placehold.co/100x100/FFF8DC/000000?text=Diet+Coke' },
  { id: 'p22', name: 'iPad Air', price: 60000.0, category: 'Tablets', image: 'https://placehold.co/100x100/F0F8FF/000000?text=Tablet' },
  { id: 'p23', name: 'Samsung Galaxy Tab', price: 45000.0, category: 'Tablets', image: 'https://placehold.co/100x100/E6E6FA/000000?text=Tablet' },
  { id: 'p24', name: 'DSLR Camera', price: 90000.0, category: 'Cameras', image: 'https://placehold.co/100x100/DDA0DD/000000?text=Camera' },
  { id: 'p25', name: 'Mirrorless Camera', price: 110000.0, category: 'Cameras', image: 'https://placehold.co/100x100/BAFFC9/000000?text=Camera' },
  { id: 'p26', name: 'PlayStation 5', price: 80000.0, category: 'Gaming Consoles', image: 'https://placehold.co/100x100/ADD8E6/000000?text=PS5' },
  { id: 'p27', name: 'Xbox Series X', price: 75000.0, category: 'Gaming Consoles', image: 'https://placehold.co/100x100/CBAACB/000000?text=Xbox' },
  { id: 'p28', name: 'Smart Refrigerator', price: 200000.0, category: 'Home Appliances', image: 'https://placehold.co/100x100/F8D8C2/000000?text=Fridge' },
  { id: 'p29', name: 'Washing Machine', price: 70000.0, category: 'Home Appliances', image: 'https://placehold.co/100x100/B2D8D8/000000?text=Washine' },
  { id: 'p30', name: 'Non-stick Pan Set', price: 5000.0, category: 'Kitchenware', image: 'https://placehold.co/100x100/FFB3BA/000000?text=Pan' },
  { id: 'p31', name: 'Blender', price: 3000.0, category: 'Kitchenware', image: 'https://placehold.co/100x100/FFD700/000000?text=Blender' },
  { id: 'p32', name: 'Fiction Novel', price: 1200.0, category: 'Books', image: 'https://placehold.co/100x100/D1E7DD/000000?text=Book' },
  { id: 'p33', name: 'History Textbook', price: 2500.0, category: 'Books', image: 'https://placehold.co/100x100/E6E6FA/000000?text=Book' },
  { id: 'p34', name: 'Mens T-Shirt', price: 800.0, category: 'Clothing', image: 'https://placehold.co/100x100/DDA0DD/000000?text=T-Shirt' },
  { id: 'p35', name: 'Womens Dress', price: 3500.0, category: 'Clothing', image: 'https://placehold.co/100x100/F0F8FF/000000?text=Dress' },
  { id: 'p36', name: 'Yoga Mat', price: 2000.0, category: 'Sports Equipment', image: 'https://placehold.co/100x100/FAFAD2/000000?text=Yoga' },
  { id: 'p37', name: 'Dumbbell Set', price: 10000.0, category: 'Sports Equipment', image: 'https://placehold.co/100x100/FFE4E1/000000?text=Dumbbells' },
  { id: 'p38', name: 'Building Blocks', price: 1500.0, category: 'Toys', image: 'https://placehold.co/100x100/FFDEAD/000000?text=Blocks' },
  { id: 'p39', name: 'Action Figure', price: 800.0, category: 'Toys', image: 'https://placehold.co/100x100/E0FFFF/000000?text=Figure' },
  { id: 'p40', name: 'Face Serum', price: 2500.0, category: 'Beauty Products', image: 'https://placehold.co/100x100/F5DEB3/000000?text=Serum' },
  { id: 'p41', name: 'Vitamin C Supplement', price: 1800.0, category: 'Health Supplements', image: 'https://placehold.co/100x100/F5F5DC/000000?text=Vitamin' },
  { id: 'p42', name: 'Dog Food 5kg', price: 3000.0, category: 'Pet Supplies', image: 'https://placehold.co/100x100/FDF5E6/000000?text=DogFood' },
  { id: 'p43', name: 'Garden Shovel', price: 700.0, category: 'Garden Tools', image: 'https://placehold.co/100x100/FFF8DC/000000?text=Shovel' },
  { id: 'p44', name: 'Car Air Freshener', price: 300.0, category: 'Automotive', image: 'https://placehold.co/100x100/ADD8E6/000000?text=Freshener' },
  { id: 'p45', name: 'Printer Paper', price: 800.0, category: 'Office Supplies', image: 'https://placehold.co/100x100/BAFFC9/000000?text=Paper' },
];

const MOCK_CATEGORIES: Category[] = [
  { id: 'cat1', name: 'All Products', itemCount: 0 }, // itemCount will be calculated
  { id: 'cat2', name: 'Burgers', itemCount: 0 },
  { id: 'cat3', name: 'Fast Food', itemCount: 0 },
  { id: 'cat4', name: 'Drinks', itemCount: 0 },
  { id: 'cat5', name: 'Pizza', itemCount: 0 },
  { id: 'cat6', name: 'Sides', itemCount: 0 },
  { id: 'cat7', name: 'Headphones', itemCount: 0 },
  { id: 'cat8', name: 'Shoes', itemCount: 0 },
  { id: 'cat9', name: 'Mobiles', itemCount: 0 },
  { id: 'cat10', name: 'Watches', itemCount: 0 },
  { id: 'cat11', name: 'Laptops', itemCount: 0 },
  { id: 'cat12', name: 'Tablets', itemCount: 0 },
  { id: 'cat13', name: 'Cameras', itemCount: 0 },
  { id: 'cat14', name: 'Gaming Consoles', itemCount: 0 },
  { id: 'cat15', name: 'Home Appliances', itemCount: 0 },
  { id: 'cat16', name: 'Kitchenware', itemCount: 0 },
  { id: 'cat17', name: 'Books', itemCount: 0 },
  { id: 'cat18', name: 'Clothing', itemCount: 0 },
  { id: 'cat19', name: 'Sports Equipment', itemCount: 0 },
  { id: 'cat20', name: 'Toys', itemCount: 0 },
  { id: 'cat21', name: 'Beauty Products', itemCount: 0 },
  { id: 'cat22', name: 'Health Supplements', itemCount: 0 },
  { id: 'cat23', name: 'Pet Supplies', itemCount: 0 },
  { id: 'cat24', name: 'Garden Tools', itemCount: 0 },
  { id: 'cat25', name: 'Automotive', itemCount: 0 },
  { id: 'cat26', name: 'Office Supplies', itemCount: 0 },
];


// Dynamically calculate category item counts
const calculateCategoryCounts = (products: Product[]) => {
  const counts: { [key: string]: number } = {};
  products.forEach(product => {
    counts[product.category] = (counts[product.category] || 0) + 1;
  });
  return MOCK_CATEGORIES.map(category => ({
    ...category,
    itemCount: category.name === 'All Products' ? products.length : (counts[category.name] || 0)
  }));
};


// --- Utility Components (Modals) ---

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative animate-scale-in">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

// Generic Confirmation Modal
interface ConfirmationModalProps extends ModalProps {
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, message, onConfirm, title, confirmText = "Confirm", cancelText = "Cancel" }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="text-center space-y-4">
        <p className="text-lg text-gray-700">{message}</p>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Generic Info/Alert Modal
interface InfoModalProps extends ModalProps {
  message: string;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, message, title }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="text-center space-y-4">
        <Info size={48} className="text-blue-500 mx-auto mb-4" />
        <p className="text-lg text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          OK
        </button>
      </div>
    </Modal>
  );
};


const ScanQRCodeModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Scan QR Code">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center border-4 border-dashed border-gray-400">
          <Scan size={64} className="text-gray-500" />
        </div>
        <p className="text-gray-600">Please scan the QR code now...</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Done Scanning
        </button>
      </div>
    </Modal>
  );
};

const PaymentConfirmationModal: React.FC<{ isOpen: boolean; onClose: () => void; onConfirm: () => void; total: number }> = ({ isOpen, onClose, onConfirm, total }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Payment">
      <div className="text-center space-y-4">
        <p className="text-lg text-gray-700">Total amount to pay: <span className="font-bold text-green-600 text-2xl">${total.toFixed(2)}</span></p>
        <p className="text-gray-600">Are you sure you want to proceed with the payment?</p>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </Modal>
  );
};

const PrintBillModal: React.FC<{ isOpen: boolean; onClose: () => void; onPrint: () => void }> = ({ isOpen, onClose, onPrint }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Print Bill">
      <div className="text-center space-y-4">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <p className="text-lg text-gray-700 font-semibold">Payment Successful!</p>
        <p className="text-gray-600">Would you like to print the bill?</p>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            No, Thanks
          </button>
          <button
            onClick={onPrint}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Printer size={20} className="inline-block mr-2" /> Print Bill
          </button>
        </div>
      </div>
    </Modal>
  );
};

const ProductDetailModal: React.FC<{ isOpen: boolean; onClose: () => void; product: Product | null }> = ({ isOpen, onClose, product }) => {
  if (!product) return null; // Ensure product is not null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.name}>
      <div className="flex flex-col items-center space-y-4 text-center">
        <img src={product.image} alt={product.name} className="w-64 h-64 object-cover rounded-lg shadow-md" onError={(e) => (e.currentTarget.src = 'https://placehold.co/256x256/cccccc/333333?text=No+Image')} />
        <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>
        <p className="text-xl text-green-600 font-semibold">${product.price.toFixed(2)}</p>
        <p className="text-gray-600">Category: <span className="font-medium">{product.category}</span></p>
        <p className="text-sm text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

const PaymentMethodModal: React.FC<{ isOpen: boolean; onClose: () => void; type: 'cash' | 'debit'; total: number; onPaymentSuccess: () => void; onAmountInsufficient: () => void }> = ({ isOpen, onClose, type, total, onPaymentSuccess, onAmountInsufficient }) => {
  const [amountReceived, setAmountReceived] = useState<number>(total);
  const changeDue = amountReceived - total;

  useEffect(() => {
    if (isOpen) {
      setAmountReceived(total); // Reset amount received when modal opens
    }
  }, [isOpen, total]);

  const handleConfirm = () => {
    if (amountReceived < total && type === 'cash') {
      onAmountInsufficient(); // Replaced alert with InfoModal
      return;
    }
    // In a real app, you'd send this payment info to backend
    console.log(`Payment confirmed via ${type}. Total: $${total.toFixed(2)}, Received: $${amountReceived.toFixed(2)}, Change: $${changeDue.toFixed(2)}`);
    onClose(); // Close this modal
    onPaymentSuccess(); // Trigger the success handler passed from App
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${type === 'cash' ? 'Cash' : 'Debit Card'} Payment`}>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center text-xl font-semibold">
          <span>Amount Due:</span>
          <span className="text-blue-600">${total.toFixed(2)}</span>
        </div>

        {type === 'cash' && (
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">Amount Received:</label>
            <input
              type="number"
              value={amountReceived}
              onChange={(e) => setAmountReceived(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg text-2xl font-bold text-center focus:ring-blue-500 focus:border-blue-500"
              step="any"
              min="0"
            />
          </div>
        )}
        {type === 'debit' && (
           <div className="text-center text-gray-700">
             <p className="text-lg">Please insert/swipe card at the terminal.</p>
             <p className="text-sm text-gray-500 mt-2">Waiting for card payment confirmation...</p>
             <CreditCard size={64} className="mx-auto mt-6 text-blue-400 animate-pulse" />
           </div>
        )}

        {type === 'cash' && (
          <div className="flex justify-between items-center text-xl font-semibold pt-2 border-t border-dashed border-gray-300">
            <span>Change Due:</span>
            <span className={changeDue >= 0 ? 'text-green-600' : 'text-red-600'}>${changeDue.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </Modal>
  );
};


// Dummy data for Orders/Transactions for modals
const MOCK_ORDERS = [
  { id: 'ORD001', date: '2024-06-20', total: 575.00, items: 2, status: 'Completed' },
  { id: 'ORD002', date: '2024-06-20', total: 1200.00, items: 3, status: 'Held' },
  { id: 'ORD003', date: '2024-06-19', total: 95.00, items: 1, status: 'Completed' },
  { id: 'ORD004', date: '2024-06-18', total: 8500.00, items: 5, status: 'Completed' },
];

const MOCK_TRANSACTIONS = [
  { id: 'TRN001', date: '2024-06-20', type: 'Sale', amount: 575.00, method: 'Cash' },
  { id: 'TRN002', date: '2024-06-20', type: 'Refund', amount: -50.00, method: 'Debit Card' },
  { id: 'TRN003', date: '2024-06-19', type: 'Sale', amount: 95.00, method: 'Scan QR' },
  { id: 'TRN004', date: '2024-06-18', type: 'Sale', amount: 8500.00, method: 'Cash' },
];

const ViewOrdersModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="View Orders">
      <div className="overflow-y-auto h-96">
        {MOCK_ORDERS.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No orders found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {MOCK_ORDERS.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Held' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Modal>
  );
};

const TransactionsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transaction History">
      <div className="overflow-y-auto h-96">
        {MOCK_TRANSACTIONS.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No transactions found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trans ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {MOCK_TRANSACTIONS.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Modal>
  );
};


// --- Main App Component ---
const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState<string>('');
  const [taxRate, setTaxRate] = useState<number>(0.05); // 5% default tax (5%)
  const [shippingCost, setShippingCost] = useState<number>(0); // Added shipping cost
  const [discountPercent, setDiscountPercent] = useState<number>(0); // Added discount percentage
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [isScanModalOpen, setIsScanModalOpen] = useState<boolean>(false);
  const [isPaymentConfirmModalOpen, setIsPaymentConfirmModalOpen] = useState<boolean>(false); // This will now be primarily for "Pay Now" logic
  const [isPrintBillModalOpen, setIsPrintBillModalOpen] = useState<boolean>(false);
  const [isProductDetailModalOpen, setIsProductDetailModalOpen] = useState<boolean>(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState<boolean>(false); // For Cash/Debit specific modals
  const [paymentMethodType, setPaymentMethodType] = useState<'cash' | 'debit' | null>(null);

  // States for new modals
  const [isResetConfirmModalOpen, setIsResetConfirmModalOpen] = useState<boolean>(false);
  const [isVoidConfirmModalOpen, setIsVoidConfirmModalOpen] = useState<boolean>(false);
  const [isCartEmptyInfoModalOpen, setIsCartEmptyInfoModalOpen] = useState<boolean>(false);
  const [isTransactionHeldInfoModalOpen, setIsTransactionHeldInfoModalOpen] = useState<boolean>(false);
  const [isAmountInsufficientInfoModalOpen, setIsAmountInsufficientInfoModalOpen] = useState<boolean>(false);
  const [isViewOrdersModalOpen, setIsViewOrdersModalOpen] = useState<boolean>(false);
  const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState<boolean>(false);


  const categoriesWithCounts = calculateCategoryCounts(MOCK_PRODUCTS);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Scroll carousel left/right
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 200; // Adjust as needed
      carouselRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Calculate totals
  const rawSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = rawSubtotal * (discountPercent / 100);
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  const taxAmount = subtotalAfterDiscount * taxRate;
  const totalPayment = subtotalAfterDiscount + taxAmount + shippingCost;


  // Add product to cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Update cart item quantity
  const updateCartQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + delta } : item
      );
      // Remove item if quantity drops to 0 or below
      return updatedCart.filter((item) => item.quantity > 0);
    });
  };

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Handle Pay Now button click - now opens the general payment method selection (or confirmation)
  const handlePayNow = () => {
    if (cart.length === 0) {
      setIsCartEmptyInfoModalOpen(true); // Replaced alert
      return;
    }
    setIsPaymentConfirmModalOpen(true);
  };

  // Handle a specific payment method click (Cash, Debit)
  const handlePaymentMethodClick = (type: 'cash' | 'debit') => {
    if (cart.length === 0) {
      setIsCartEmptyInfoModalOpen(true); // Replaced alert
      return;
    }
    setPaymentMethodType(type);
    setIsPaymentMethodModalOpen(true);
  };

  // Callback from PaymentMethodModal when confirmed
  const onSpecificPaymentSuccess = () => {
    setIsPaymentMethodModalOpen(false); // Close payment method modal
    setIsPaymentConfirmModalOpen(false); // Ensure main confirmation is also closed if open
    setIsPrintBillModalOpen(true); // Proceed to print bill
    setCart([]); // Clear cart
    setCustomerName(''); // Clear customer info
    setShippingCost(0); // Reset shipping
    setDiscountPercent(0); // Reset discount
    setTaxRate(0.05); // Reset tax
  };


  // Handle Reset button (Clear Cart) - using custom modal
  const handleResetCart = () => {
    setIsResetConfirmModalOpen(true);
  };

  const confirmResetCart = () => {
    setCart([]);
    setCustomerName('');
    setShippingCost(0);
    setDiscountPercent(0);
    setTaxRate(0.05);
    setIsResetConfirmModalOpen(false);
  };

  // Handle Void button (Cancel Transaction) - using custom modal
  const handleVoidTransaction = () => {
    setIsVoidConfirmModalOpen(true);
  };

  const confirmVoidTransaction = () => {
    setCart([]);
    setCustomerName('');
    setShippingCost(0);
    setDiscountPercent(0);
    setTaxRate(0.05);
    setIsVoidConfirmModalOpen(false);
  };

  // Handle "Transaction held!" button - using InfoModal
  const handleHoldTransaction = () => {
    setIsTransactionHeldInfoModalOpen(true);
  };

  // Filter products based on search term and category
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true; // Handles empty search term
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle product zoom to full
  const handleProductZoom = (product: Product) => {
    setSelectedProductForDetail(product);
    setIsProductDetailModalOpen(true);
  };

  // Tailwind CSS custom animation classes
  const animationStyles = `
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
    .animate-scale-in {
      animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scaleIn {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .carousel-item {
        scroll-snap-align: start;
        transition: transform 0.3s ease-in-out;
    }
    .carousel-item:hover {
        transform: scale(1.05);
    }
    /* Custom Scrollbar Styling - Applied to both cart and product grid */
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
  `;

  return (
    <div className="flex h-screen bg-gray-50 font-sans relative">
      <style>{animationStyles}</style>

      {/* Cart Section (Left Side) - Adjusted width to match image ratio */}
      <div className="w-[400px] min-w-[300px] max-w-[500px] p-6 bg-white border-r border-gray-200 flex flex-col shadow-lg overflow-y-auto hide-scrollbar">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
          <ShoppingCart size={28} className="mr-3 text-blue-600" /> Your Cart
        </h2>

        {/* Customer Information (similar to previous version, not in image but good to keep) */}
        <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Customer Information</h3>
          <input
            type="text"
            placeholder="Customer Name (Optional)"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        {/* Product Information in Cart */}
        <div className="flex-1 overflow-y-auto mb-6 pr-2 hide-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-10 border-2 border-dashed border-gray-300 rounded-lg">
              <ShoppingCart size={48} className="mx-auto mb-4" />
              No items in cart. Add products from the right panel.
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm animate-fade-in">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md mr-4 flex-shrink-0 border border-gray-300 p-0.5" // Added padding to image
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/64x64/cccccc/333?text=Img'; // Shorter fallback text
                      e.currentTarget.classList.add('bg-gray-200'); // Ensure background if image fails
                    }}
                  />
                  <div className="flex-grow flex flex-col justify-center py-1"> {/* Added padding */}
                    <p className="font-bold text-lg text-gray-800 leading-tight">{item.name}</p> {/* Increased font size/boldness */}
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)} / pc</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-auto"> {/* Pushed to right */}
                    <button
                      onClick={() => updateCartQuantity(item.id, -1)}
                      className="p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-medium text-gray-800 w-8 text-center flex-shrink-0">Qty:{item.quantity}</span> {/* Explicit Qty, adjusted width */}
                    <button
                      onClick={() => updateCartQuantity(item.id, 1)}
                      className="p-1 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors duration-200"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200 ml-2" // Added margin
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment Summary - Replicated from image */}
        <div className="p-4 border-t border-gray-200 space-y-3 text-gray-800">
          <div className="flex justify-between items-center text-lg">
            <span>Sub Total:</span>
            <span className="font-semibold">${rawSubtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span>Tax (GST {Math.round(taxRate * 100)}%):</span>
            <div className="flex items-center">
              <input
                type="number"
                min="0"
                max="100"
                step="0.01" // Allow decimals for tax input
                value={Math.round(taxRate * 100)} // Display as percentage
                onChange={(e) => setTaxRate(Number(e.target.value) / 100)}
                className="w-16 p-1 border border-gray-300 rounded-md text-center mr-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <span className="font-semibold">${taxAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span>Shipping:</span>
            <div className="flex items-center">
              <Truck size={18} className="text-gray-500 mr-2" />
              <input
                type="number"
                min="0"
                step="any"
                value={shippingCost}
                onChange={(e) => setShippingCost(Number(e.target.value))}
                className="w-24 p-1 border border-gray-300 rounded-md text-center focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>
          {/* Note: The image has "Sub Total" twice. I'll keep one for logical flow. */}
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Sub Total (after discount):</span> {/* Clarified for image comparison */}
            <span className="font-semibold">${subtotalAfterDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-lg text-red-600">
            <span>Discount ({Math.round(discountPercent)}%):</span>
            <div className="flex items-center">
              <Percent size={18} className="text-red-500 mr-2" />
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-16 p-1 border border-red-300 rounded-md text-center focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              />
              <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-2xl font-bold text-blue-700 pt-2 border-t border-dashed border-gray-300">
            <span>Grand Total:</span>
            <span>${totalPayment.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Methods - With functionality */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Payment Method</h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handlePaymentMethodClick('cash')}
              className="flex flex-col items-center justify-center p-3 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition-transform duration-200 active:scale-95 border border-gray-300"
            >
              <DollarSign size={24} className="text-green-600" />
              <span className="text-sm mt-1">Cash</span>
            </button>
            <button
              onClick={() => handlePaymentMethodClick('debit')}
              className="flex flex-col items-center justify-center p-3 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition-transform duration-200 active:scale-95 border border-gray-300"
            >
              <CreditCard size={24} className="text-purple-600" />
              <span className="text-sm mt-1">Debit Card</span>
            </button>
            <button
              onClick={() => setIsScanModalOpen(true)}
              className="flex flex-col items-center justify-center p-3 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition-transform duration-200 active:scale-95 border border-gray-300"
            >
              <Scan size={24} className="text-orange-600" />
              <span className="text-sm mt-1">Scan QR</span>
            </button>
          </div>
        </div>

        {/* Action Buttons - With functionality and matching UI */}
        <div className="grid grid-cols-2 gap-3 mt-auto pt-4"> {/* mt-auto pushes to bottom */}
          <button
            onClick={handleHoldTransaction} // Linked to new InfoModal
            className="flex items-center justify-center p-4 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-transform duration-200 active:scale-95 text-lg font-bold"
          >
            <Hand size={20} className="mr-2" /> Hold
          </button>
          <button
            onClick={handleVoidTransaction} // Linked to custom confirmation modal
            className="flex items-center justify-center p-4 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-transform duration-200 active:scale-95 text-lg font-bold"
          >
            <X size={20} className="mr-2" /> Void
          </button>
          <button
            onClick={handlePayNow} // Changed to handlePayNow which triggers PaymentConfirmationModal first
            className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform duration-200 active:scale-95 text-lg font-bold col-span-2"
          >
            <DollarSign size={20} className="mr-2" /> Payment {/* Renamed to Payment as per image */}
          </button>
        </div>
      </div>

      {/* Products Section (Right Side) */}
      <div className="flex-1 p-6 bg-gray-100 flex flex-col">
        {/* Top Header - Replicated from image */}
        <header className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-gray-700">POS</span>
            <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              <Receipt size={16} className="mr-1" />
              Freshmart
              <ChevronDown size={16} className="ml-1" />
            </div>
            {/* These buttons are placeholders from the image, no specific functionality yet */}
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><SlidersHorizontal size={20} /></button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><Settings size={20} /></button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><Tag size={20} /></button>
          </div>
          <div className="flex items-center space-x-3">
            <img src="https://placehold.co/32x32/1E90FF/FFFFFF?text=JD" alt="User Avatar" className="w-8 h-8 rounded-full" />
            <span className="font-medium text-gray-700">John Doe</span>
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </header>

        {/* Search and Action Bar - Replicated from image */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-3">
            <button
              onClick={() => setIsViewOrdersModalOpen(true)} // Linked to new ViewOrdersModal
              className="flex items-center p-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-transform duration-200 active:scale-95"
            >
              <Eye size={20} className="mr-2" /> View Orders
            </button>
            <button
              onClick={handleResetCart} // "Reset" in image acts like clearing cart, linked to custom confirmation
              className="flex items-center p-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition-transform duration-200 active:scale-95"
            >
              <RefreshCcw size={20} className="mr-2" /> Reset
            </button>
            <button
              onClick={() => setIsTransactionsModalOpen(true)} // Linked to new TransactionsModal
              className="flex items-center p-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition-transform duration-200 active:scale-95"
            >
              <List size={20} className="mr-2" /> Transaction
            </button>
          </div>
          <div className="relative flex-1 max-w-xs ml-4">
            <input
              type="text"
              placeholder="Search Product"
              className="w-full p-3 pl-10 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Categories Carousel (Horizontal Scroll) */}
        <div className="mb-6 relative"> {/* Added relative for positioning buttons */}
          <h3 className="text-xl font-bold mb-3 text-gray-800">Categories</h3>
          <button
              onClick={() => scrollCarousel('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 z-10 hidden md:block" // Hidden on small screens
            >
              <ChevronLeft size={20} />
            </button>
          <div ref={carouselRef}
            className="flex overflow-x-auto pb-4 hide-scrollbar space-x-4" // Horizontal flex, horizontal scroll
          >
            {categoriesWithCounts.map(category => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex-shrink-0 w-32 h-32 flex flex-col items-center justify-center p-3 rounded-lg shadow-md transition-all duration-200 cursor-pointer carousel-item
                  ${selectedCategory === category.name
                    ? 'bg-blue-600 text-white scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
              >
                {/* Placeholder for category image/icon as per image (used for example, you can add more) */}
                {category.name === 'All Products' && <List size={40} className="mb-2" />}
                {category.name === 'Headphones' && <img src="https://placehold.co/40x40/E6E6FA/000000?text=HP" alt="Headphones" className="mb-2" />}
                {category.name === 'Shoes' && <img src="https://placehold.co/40x40/F0F8FF/000000?text=SH" alt="Shoes" className="mb-2" />}
                {category.name === 'Mobiles' && <img src="https://placehold.co/40x40/FFE4E1/000000?text=MB" alt="Mobiles" className="mb-2" />}
                {category.name === 'Watches' && <img src="https://placehold.co/40x40/E0FFFF/000000?text=WA" alt="Watches" className="mb-2" />}
                {category.name === 'Laptops' && <img src="https://placehold.co/40x40/F5F5DC/000000?text=LP" alt="Laptops" className="mb-2" />}
                {category.name === 'Burgers' && <img src="https://placehold.co/40x40/A0D9B0/000000?text=BG" alt="Burgers" className="mb-2" />}
                {category.name === 'Fast Food' && <img src="https://placehold.co/40x40/FFD700/000000?text=FF" alt="Fast Food" className="mb-2" />}
                {category.name === 'Drinks' && <img src="https://placehold.co/40x40/ADD8E6/000000?text=DR" alt="Drinks" className="mb-2" />}
                {category.name === 'Pizza' && <img src="https://placehold.co/40x40/FFB3BA/000000?text=PZ" alt="Pizza" className="mb-2" />}
                {category.name === 'Sides' && <img src="https://placehold.co/40x40/BAFFC9/000000?text=SD" alt="Sides" className="mb-2" />}
                {category.name === 'Tablets' && <img src="https://placehold.co/40x40/F0F8FF/000000?text=TB" alt="Tablets" className="mb-2" />}
                {category.name === 'Cameras' && <img src="https://placehold.co/40x40/DDA0DD/000000?text=CM" alt="Cameras" className="mb-2" />}
                {category.name === 'Gaming Consoles' && <img src="https://placehold.co/40x40/CBAACB/000000?text=GC" alt="Gaming Consoles" className="mb-2" />}
                {category.name === 'Home Appliances' && <img src="https://placehold.co/40x40/F8D8C2/000000?text=HA" alt="Home Appliances" className="mb-2" />}
                {category.name === 'Kitchenware' && <img src="https://placehold.co/40x40/FFB3BA/000000?text=KW" alt="Kitchenware" className="mb-2" />}
                {category.name === 'Books' && <img src="https://placehold.co/40x40/D1E7DD/000000?text=BK" alt="Books" className="mb-2" />}
                {category.name === 'Clothing' && <img src="https://placehold.co/40x40/DDA0DD/000000?text=CL" alt="Clothing" className="mb-2" />}
                {category.name === 'Sports Equipment' && <img src="https://placehold.co/40x40/FAFAD2/000000?text=SP" alt="Sports Equipment" className="mb-2" />}
                {category.name === 'Toys' && <img src="https://placehold.co/40x40/FFDEAD/000000?text=TOY" alt="Toys" className="mb-2" />}
                {category.name === 'Beauty Products' && <img src="https://placehold.co/40x40/F5DEB3/000000?text=BP" alt="Beauty Products" className="mb-2" />}
                {category.name === 'Health Supplements' && <img src="https://placehold.co/40x40/F5F5DC/000000?text=HS" alt="Health Supplements" className="mb-2" />}
                {category.name === 'Pet Supplies' && <img src="https://placehold.co/40x40/FDF5E6/000000?text=PS" alt="Pet Supplies" className="mb-2" />}
                {category.name === 'Garden Tools' && <img src="https://placehold.co/40x40/FFF8DC/000000?text=GT" alt="Garden Tools" className="mb-2" />}
                {category.name === 'Automotive' && <img src="https://placehold.co/40x40/ADD8E6/000000?text=AT" alt="Automotive" className="mb-2" />}
                {category.name === 'Office Supplies' && <img src="https://placehold.co/40x40/BAFFC9/000000?text=OS" alt="Office Supplies" className="mb-2" />}


                <span className="font-semibold text-center text-sm">{category.name.replace(' ', '\n')}</span> {/* Adjusted text size */}
                <span className="text-xs">{category.itemCount} Items</span>
              </div>
            ))}
          </div>
          <button
              onClick={() => scrollCarousel('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 z-10 hidden md:block" // Hidden on small screens
            >
              <ChevronRight size={20} />
            </button>
        </div>

        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto pr-2 hide-scrollbar">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10 border-2 border-dashed border-gray-300 rounded-lg">
              No products found matching your criteria.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200 cursor-pointer flex flex-col"
                onClick={() => addToCart(product)} // Add product to cart on click
              >
                <div className="relative w-full h-40 bg-gray-200 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = 'https://placehold.co/160x160/cccccc/333333?text=Product')}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent adding to cart when clicking zoom
                      handleProductZoom(product);
                    }}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75 transition-colors duration-200"
                  >
                    <Search size={16} />
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 leading-tight">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 flex-grow">{product.category}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xl font-bold text-green-600">${product.price.toFixed(2)}</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200">
                      Add <Tag size={16} className="inline-block ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modals */}
      <ScanQRCodeModal isOpen={isScanModalOpen} onClose={() => setIsScanModalOpen(false)} />
      <PaymentConfirmationModal
        isOpen={isPaymentConfirmModalOpen}
        onClose={() => setIsPaymentConfirmModalOpen(false)}
        onConfirm={onSpecificPaymentSuccess}
        total={totalPayment}
      />
      <PrintBillModal isOpen={isPrintBillModalOpen} onClose={() => setIsPrintBillModalOpen(false)} onPrint={() => console.log("Printing bill...")} />
      <ProductDetailModal
        isOpen={isProductDetailModalOpen}
        onClose={() => setIsProductDetailModalOpen(false)}
        product={selectedProductForDetail}
      />
      {paymentMethodType && (
        <PaymentMethodModal
          isOpen={isPaymentMethodModalOpen}
          onClose={() => setIsPaymentMethodModalOpen(false)}
          type={paymentMethodType}
          total={totalPayment}
          onPaymentSuccess={onSpecificPaymentSuccess}
          onAmountInsufficient={() => setIsAmountInsufficientInfoModalOpen(true)} // Pass the new info modal handler
        />
      )}

      {/* New Confirmation/Info Modals */}
      <ConfirmationModal
        isOpen={isResetConfirmModalOpen}
        onClose={() => setIsResetConfirmModalOpen(false)}
        title="Confirm Reset"
        message="Are you sure you want to clear the cart and reset all transaction details?"
        onConfirm={confirmResetCart}
        confirmText="Yes, Reset"
      />
      <ConfirmationModal
        isOpen={isVoidConfirmModalOpen}
        onClose={() => setIsVoidConfirmModalOpen(false)}
        title="Confirm Void"
        message="Are you sure you want to void the current transaction? This action cannot be undone."
        onConfirm={confirmVoidTransaction}
        confirmText="Yes, Void"
      />
      <InfoModal
        isOpen={isCartEmptyInfoModalOpen}
        onClose={() => setIsCartEmptyInfoModalOpen(false)}
        title="Cart Empty"
        message="Please add products to the cart before proceeding with payment."
      />
      <InfoModal
        isOpen={isTransactionHeldInfoModalOpen}
        onClose={() => setIsTransactionHeldInfoModalOpen(false)}
        title="Transaction Held"
        message="The current transaction has been successfully held. You can resume it later."
      />
       <InfoModal
        isOpen={isAmountInsufficientInfoModalOpen}
        onClose={() => setIsAmountInsufficientInfoModalOpen(false)}
        title="Insufficient Amount"
        message="Amount received is less than total. Please enter sufficient cash."
      />
      {/* New View Orders and Transactions Modals */}
      <ViewOrdersModal isOpen={isViewOrdersModalOpen} onClose={() => setIsViewOrdersModalOpen(false)} />
      <TransactionsModal isOpen={isTransactionsModalOpen} onClose={() => setIsTransactionsModalOpen(false)} />
    </div>
  );
};

export default App;
