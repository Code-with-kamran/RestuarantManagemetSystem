"use client";
import { CreditCard, DollarSign, Hand, Scan, X, Sparkles, Printer, ClipboardList, BarChart3, Search, User, Store, RefreshCcw, Home } from "lucide-react"; // Added new icons
import Link from "next/link";
import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import ReactDOMServer from 'react-dom/server'; // For server-side rendering receipt for print

// --- Mock Button Component ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
                  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                  bg-gray-900 text-gray-50 hover:bg-gray-900/90 h-10 px-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// --- Mock Skeleton Component ---
interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
  );
};

// --- Interfaces for data types ---
interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  description?: string;
}

interface CartItem extends Product {
  quantity: number;
  total: number;
}

interface Transaction {
  id: string;
  date: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
  paymentMethod: string;
}

interface Customer {
  id: string;
  name: string;
}

interface Register {
  id: string;
  name: string;
}

// --- Mock Data ---
const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1", name: "Tikka Burger", price: 250.0, category: "BURGERS", image: "https://placehold.co/100x100/A0D9B0/000000?text=Burger",
    description: "A classic juicy chicken patty seasoned with rich tikka spices, served in a soft bun with fresh lettuce and sauce.",
  },
  {
    id: "p2", name: "Zinger Burger", price: 300.0, category: "BURGERS", image: "https://placehold.co/100x100/FFD700/000000?text=Zinger",
    description: "Crispy, succulent chicken fillet with a zesty coating, topped with crunchy lettuce and special zinger sauce.",
  },
  {
    id: "p3", name: "Pizza (Small)", price: 500.0, category: "PIZZA", image: "https://placehold.co/100x100/FFA07A/000000?text=Pizza",
    description: "Delicious small pizza with a crispy crust, melted mozzarella, and your choice of classic toppings. Perfect for a quick bite!",
  },
  {
    id: "p4", name: "Fries (Medium)", price: 120.0, category: "SIDES", image: "https://placehold.co/100x100/DDA0DD/000000?text=Fries",
    description: "Golden, crispy medium-sized fries, lightly salted and perfect for dipping. A classic side for any meal.",
  },
  {
    id: "p5", name: "Coke (Can)", price: 80.0, category: "DRINKS", image: "https://placehold.co/100x100/ADD8E6/000000?text=Coke",
    description: "Refreshingly cold can of Coca-Cola, the perfect beverage to complement your meal.",
  },
  {
    id: "p6", name: "Chicken Roll", price: 180.0, category: "ROLLS", image: "https://placehold.co/100x100/87CEEB/000000?text=Roll",
    description: "Tender chicken pieces marinated in flavorful spices, wrapped in a warm, soft paratha with fresh salad and chutney.",
  },
  {
    id: "p7", name: "Veggie Burger", price: 220.0, category: "BURGERS", image: "https://placehold.co/100x100/90EE90/000000?text=Veggie",
    description: "A wholesome and flavorful vegetarian patty, nestled in a soft bun with crisp vegetables and a tangy sauce. A healthy delight!",
  },
  {
    id: "p8", name: "Large Pizza", price: 900.0, category: "PIZZA", image: "https://placehold.co/100x100/F0E68C/000000?text=LgPizza",
    description: "Our signature large pizza, generously topped with premium ingredients and baked to perfection. Ideal for sharing!",
  },
  {
    id: "p9", name: "Onion Rings", price: 150.0, category: "SIDES", image: "https://placehold.co/100x100/B0E0E6/000000?text=Rings",
    description: "Crispy, golden-brown onion rings, a perfect crunchy side or snack for any occasion.",
  },
  {
    id: "p10", name: "Water Bottle", price: 50.0, category: "DRINKS", image: "https://placehold.co/100x100/ADD8E6/000000?text=Water",
    description: "Pure, refreshing bottled water, essential for staying hydrated with your meal.",
  },
  {
    id: "p11", name: "Club Sandwich", price: 350.0, category: "SANDWICHES", image: "https://placehold.co/100x100/FFD700/000000?text=Sandwich",
    description: "A hearty triple-layered sandwich with grilled chicken, fresh veggies, and a special sauce, toasted to perfection.",
  },
  {
    id: "p12", name: "Pasta", price: 400.0, category: "MAIN COURSE", image: "https://placehold.co/100x100/FFA07A/000000?text=Pasta",
    description: "Creamy and rich pasta dish, tossed with your choice of savory sauce and fresh ingredients. A delightful Italian classic.",
  },
];

// Mock Transactions for Order History
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "T001",
    date: "2024-06-20 14:30",
    total: 770.00,
    items: [{ name: "Tikka Burger", quantity: 2, price: 250 }, { name: "Fries (Medium)", quantity: 1, price: 120 }, { name: "Coke (Can)", quantity: 2, price: 80 }],
    paymentMethod: "Cash",
  },
  {
    id: "T002",
    date: "2024-06-20 11:00",
    total: 540.00,
    items: [{ name: "Zinger Burger", quantity: 1, price: 300 }, { name: "Water Bottle", quantity: 1, price: 50 }, { name: "Onion Rings", quantity: 1, price: 150 }],
    paymentMethod: "Debit Card",
  },
  {
    id: "T003",
    date: "2024-06-19 18:45",
    total: 900.00,
    items: [{ name: "Large Pizza", quantity: 1, price: 900 }],
    paymentMethod: "Cash",
  },
];

const MOCK_CUSTOMERS: Customer[] = [
  { id: "C001", name: "Walk-in Customer" },
  { id: "C002", name: "John Doe" },
  { id: "C003", name: "Jane Smith" },
];

const MOCK_REGISTERS: Register[] = [
  { id: "R001", name: "Main Counter" },
  { id: "R002", name: "Drive-Thru" },
  { id: "R003", name: "Online Orders" },
];

// --- General Purpose Modal Component ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in p-4">
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

// --- Info Modal Component ---
interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string | React.ReactNode;
  title: string;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, message, title }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="p-4 text-center">
        <p className="text-lg text-gray-700 mb-6">{message}</p>
        <Button onClick={onClose} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          OK
        </Button>
      </div>
    </Modal>
  );
};

// --- Confirmation Modal Component ---
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  title: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, message, title }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="p-4 text-center">
        <p className="text-lg text-gray-700 mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          <Button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// --- Payment Method Modal ---
interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'cash' | 'debit';
  total: number;
  onPaymentSuccess: () => void;
  onAmountInsufficient: () => void;
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({ isOpen, onClose, type, total, onPaymentSuccess, onAmountInsufficient }) => {
  const [amountReceived, setAmountReceived] = useState<number>(total);
  const changeDue = amountReceived - total;

  useEffect(() => {
    if (isOpen) {
      setAmountReceived(total);
    }
  }, [isOpen, total]);

  const handleConfirm = () => {
    if (amountReceived < total && type === 'cash') {
      onAmountInsufficient();
      return;
    }
    console.log(`Payment confirmed via ${type}. Total: Rs${total.toFixed(2)}, Received: Rs${amountReceived.toFixed(2)}, Change: Rs${changeDue.toFixed(2)}`);
    onClose();
    onPaymentSuccess();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${type === 'cash' ? 'Cash' : 'Debit Card'} Payment`}>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center text-xl font-semibold">
          <span>Amount Due:</span>
          <span className="text-blue-600">Rs{total.toFixed(2)}</span>
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
            <span className={changeDue >= 0 ? 'text-green-600' : 'text-red-600'}>Rs{changeDue.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <Button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Confirm Payment
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// --- Receipt Modal Component ---
interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  finalTotal: number;
  personalizedCustomerMessage: string;
  isGeneratingPersonalizedMessage: boolean;
  generatePersonalizedMessage: () => void;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  tax,
  discount,
  finalTotal,
  personalizedCustomerMessage,
  isGeneratingPersonalizedMessage,
  generatePersonalizedMessage,
}) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const printReceipt = useCallback(() => {
    if (receiptRef.current) {
      const printContent = receiptRef.current.innerHTML;
      const printWindow = window.open('', '', 'height=600,width=800');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Receipt</title>');
        printWindow.document.write('<style>');
        printWindow.document.write(`
          body { font-family: 'Inter', sans-serif; margin: 20px; }
          .receipt-container { width: 300px; margin: 0 auto; padding: 20px; border: 1px dashed #ccc; }
          .header { text-align: center; margin-bottom: 20px; }
          .item-row { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9em; }
          .total-row { display: flex; justify-content: space-between; margin-top: 10px; font-weight: bold; }
          .dashed-line { border-top: 1px dashed #ccc; margin: 15px 0; }
          .message { text-align: center; margin-top: 20px; font-style: italic; font-size: 0.9em; }
        `);
        printWindow.document.write('</style></head><body>');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      } else {
        console.error("Failed to open print window.");
      }
    }
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Payment Successful!">
      <div className="flex flex-col items-center">
        <div ref={receiptRef} className="bg-white p-6 rounded-lg shadow-inner w-full max-w-sm border border-gray-200">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800">Your Store</h3>
            <p className="text-sm text-gray-500">Sales Receipt</p>
            <p className="text-xs text-gray-400 mt-1">{new Date().toLocaleString()}</p>
          </div>
          <div className="border-t border-dashed border-gray-300 my-4"></div>
          <div className="mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-1">
                <span>{item.name} (x{item.quantity})</span>
                <span>Rs{item.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-dashed border-gray-300 bg-red-300"></div>
          <div className="flex justify-between text-md ">
            <span>Subtotal:</span>
            <span className="font-semibold">Rs{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-md ">
            <span>Tax (5%):</span>
            <span className="font-semibold">Rs{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-md  text-green-600">
            <span>Discount (10%):</span>
            <span className="font-semibold">-Rs{discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-200 text-xl font-bold text-gray-800 mt-2">
            <span>Total:</span>
            <span>Rs{finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-lg text-gray-700 mt-4 mb-4">Payment processed successfully!</p>
        
        {personalizedCustomerMessage ? (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-blue-800 text-sm italic mb-4 w-full">
            <h5 className="font-semibold mb-1">Personalized Message:</h5>
            <p>{personalizedCustomerMessage}</p>
          </div>
        ) : isGeneratingPersonalizedMessage ? (
            <Skeleton className="h-16 w-full mb-4" />
        ) : null}

        <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full justify-center">
            <Button
                onClick={generatePersonalizedMessage}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                disabled={isGeneratingPersonalizedMessage}
            >
                {isGeneratingPersonalizedMessage ? (
                "Generating..."
                ) : (
                <>
                    <Sparkles size={20} className="mr-2" /> Generate Message
                </>
                )}
            </Button>
            <Button
                onClick={printReceipt}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center"
            >
                <Printer size={20} className="mr-2" /> Print Receipt
            </Button>
        </div>
      </div>
    </Modal>
  );
};

// --- Daily Sales Summary Modal ---
interface DailySalesSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[]; // Pass mock transactions for summary
}

const DailySalesSummaryModal: React.FC<DailySalesSummaryModalProps> = ({ isOpen, onClose, transactions }) => {
  // Simple mock aggregation for daily sales
  const today = new Date().toISOString().slice(0, 10);
  const todaysSales = transactions.filter(t => t.date.startsWith(today));
  
  const totalRevenue = todaysSales.reduce((sum, t) => sum + t.total, 0);
  const totalTransactions = todaysSales.length;
  const itemsSold = todaysSales.reduce((sum, t) => sum + t.items.reduce((s, item) => s + item.quantity, 0), 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Daily Sales Summary">
      <div className="p-4 text-gray-800">
        <h3 className="text-xl font-bold mb-4">Sales for {today}</h3>
        <div className="grid grid-cols-2 gap-4 text-left">
          <div>
            <p className="text-lg font-semibold">Total Revenue:</p>
            <p className="text-2xl text-green-600 font-bold">Rs{totalRevenue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Total Transactions:</p>
            <p className="text-2xl text-blue-600 font-bold">{totalTransactions}</p>
          </div>
          <div className="col-span-2">
            <p className="text-lg font-semibold">Items Sold:</p>
            <p className="text-2xl text-orange-600 font-bold">{itemsSold}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-6">
          This is a mock summary. In a real application, this data would be dynamically loaded and aggregated.
        </p>
      </div>
    </Modal>
  );
};

// --- Order History / Transaction List Modal ---
interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({ isOpen, onClose, transactions }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Order History">
      <div className="p-4 overflow-y-auto max-h-[70vh]">
        {transactions.length === 0 ? (
          <p className="text-center text-gray-500">No past transactions found.</p>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg text-gray-800">Order #{transaction.id}</span>
                  <span className="text-sm text-gray-600">{transaction.date}</span>
                </div>
                <div className="mb-2">
                  <p className="font-medium">Items:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                    {transaction.items.map((item, idx) => (
                      <li key={idx}>{item.name} (x{item.quantity}) - Rs{item.price.toFixed(2)}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between text-md font-semibold text-gray-800 border-t border-dashed border-gray-300 pt-2 mt-2">
                  <span>Total:</span>
                  <span className="text-blue-600">Rs{transaction.total.toFixed(2)}</span>
                </div>
                <div className="text-right text-sm text-gray-600 mt-1">
                  Payment: {transaction.paymentMethod}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};


const CATEGORIES = Array.from(new Set(MOCK_PRODUCTS.map((p) => p.category)));

// --- Header Component ---
interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCustomer: string;
  setSelectedCustomer: (customerId: string) => void;
  selectedRegister: string;
  setSelectedRegister: (registerId: string) => void;
  setIsOrderHistoryModalOpen: (isOpen: boolean) => void;
 
  setIsDailySalesSummaryModalOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCustomer,
  setSelectedCustomer,
  selectedRegister,
  setSelectedRegister,
  setIsOrderHistoryModalOpen,
  setIsDailySalesSummaryModalOpen,
}) => {
  return (
    <header className="flex flex-col sm:flex-row items-center p-2 z-20 sticky top-0 w-full bg-background border-b border-gray-200 shadow-md">
      {/* Customer and Register Select */}
      <div className="flex gap-2 w-full sm:w-1/3 py-1 mb-2 sm:mb-0">
        <div className="relative flex-1">
          <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="border p-2 pl-9 rounded-md w-full text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Customer</option>
            {MOCK_CUSTOMERS.map(customer => (
              <option key={customer.id} value={customer.id}>{customer.name}</option>
            ))}
          </select>
        </div>
        <div className="relative flex-1">
          <Store size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <select
            value={selectedRegister}
            onChange={(e) => setSelectedRegister(e.target.value)}
            className="border p-2 pl-9 rounded-md w-full text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Register</option>
            {MOCK_REGISTERS.map(register => (
              <option key={register.id} value={register.id}>{register.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Bar and Header Action Buttons */}
      <div className="flex gap-2 flex-1 w-full sm:w-2/3 ml-0 sm:ml-2 items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search for products..."
            className="border flex-1 rounded-md px-3 py-2 pl-9 w-full text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
         {/* Daily Sales Summary Button (Order History & Reset moved to Header) */}
      
        <Button
          onClick={() => setIsDailySalesSummaryModalOpen(true)}
          className="flex  items-center justify-center  bg-gray-200 text-white rounded-lg shadow hover:bg-gray-300 transition-transform duration-200 active:scale-95 text-sm"
        >
          <BarChart3 size={20} className="text-gwhite" />
          <span className="mt-1">Daily Sales</span>
        </Button>
      
        <Button
          onClick={() => setIsOrderHistoryModalOpen(true)}
          className="py-2 px-3 text-sm sm:text-base bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 rounded-md shadow-sm"
          title="View past orders"
        >
          <ClipboardList size={18} /> <span className="hidden sm:inline">History</span>
        </Button>
<Link href="/dashboard"  className="py-2 px-3 text-sm sm:text-base bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 rounded-md shadow-sm"> <Home /> Dashboard</Link>
      </div>
    </header>
  );
};

// --- Cart Summary Component ---
interface CartSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  finalTotal: number;
  updateQuantity: (id: string, newQuantity: number) => void;
  handlePaymentMethodClick: (type: 'cash' | 'debit') => void;
  setIsScanModalOpen: (isOpen: boolean) => void;
  // setIsResetConfirmModalOpen: (isOpen: boolean) => void; // Removed, now in header
  setIsVoidConfirmModalOpen: (isOpen: boolean) => void;
  setIsTransactionHeldInfoModalOpen: (isOpen: boolean) => void;
  //setIsOrderHistoryModalOpen: (isOpen: boolean) => void; // Removed, now in header
  
  handlePayNow: () => void;
  clearCart: () => void; // Pass clearCart for the new "Clear All" button in cart
}

const CartSummary: React.FC<CartSummaryProps> = ({
  cartItems,
  subtotal,
  tax,
  discount,
  finalTotal,
  updateQuantity,
  handlePaymentMethodClick,
  setIsScanModalOpen,
  // setIsResetConfirmModalOpen, // Removed
  setIsVoidConfirmModalOpen,
  setIsTransactionHeldInfoModalOpen,
  handlePayNow,
}) => {

  return (
    <div className="flex-none w-full lg:w-1/3 p-2 bg-white shadow-lg rounded-lg flex flex-col h-screen lg:h-auto relative">
     

      {/* Cart Items Display */}
      <div
        className="overflow-auto flex-grow mb-4 custom-scrollbar "
        style={{ maxHeight: "calc(100vh - 380px)" }}
      >
        <div className="bg-orange-500 text-white p-3 font-semibold grid grid-cols-5 gap-2 text-sm sm:text-base rounded-t-lg">
          <div>Product</div>
          <div className="text-center">QTY</div>
          <div className="text-right">Price</div>
          <div className="text-right">Total</div>
          <div className="text-center">Action</div>
        </div>
        {cartItems.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No items in cart</div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-5 gap-2 items-center p-3 border-b border-gray-200 text-sm"
            >
              <div className="font-medium text-gray-800">{item.name}</div>
              <div className="text-center">
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value, 10))
                  }
                  className="w-16 text-center border border-gray-300 rounded-md p-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="text-right text-gray-700">
                Rs{item.price.toFixed(2)}
              </div>
              <div className="text-right font-semibold text-gray-800">
                Rs{item.total.toFixed(2)}
              </div>
              <div className="text-center">
                <button
                  onClick={() => updateQuantity(item.id, 0)}
                  className="text-red-500 hover:text-red-700 font-semibold text-sm transition duration-150"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

     



<div className=" absolute bottom-0 left-0 w-full ">
   {/* Totals Section */}
      <div className="p-4 bg-gray-50 rounded-b-lg ">
        <div className="flex justify-between  text-sm">
          <span>Subtotal:</span>
          <span className="font-semibold">Rs{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between  text-sm">
          <span>Tax (5%):</span>
          <span className="font-semibold">Rs{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-green-600">
          <span>Discount (0%):</span>
          <span className="font-semibold">-Rs{discount.toFixed(2)}</span>
        </div>
       
      </div>
      {/* Payment Method Buttons */}
      <div className="mb-1 pt-1">
        <h3 className="text-lg font-semibold mb-1 text-gray-700">Payment Method</h3>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handlePaymentMethodClick('cash')}
            className="flex flex-col items-center justify-center p-1 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition-transform duration-200 active:scale-95 border border-gray-300"
          >
            <DollarSign size={20} className="text-green-600" />
            <span className="text-sm mt-1">Cash</span>
          </button>
          <button
            onClick={() => handlePaymentMethodClick('debit')}
            className="flex flex-col items-center justify-center p-1 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition-transform duration-200 active:scale-95 border border-gray-300"
          >
            <CreditCard size={20} className="text-purple-600" />
            <span className="text-sm mt-1">Debit Card</span>
          </button>
          <button
            onClick={() => setIsScanModalOpen(true)}
            className="flex flex-col items-center justify-center p-1 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition-transform duration-200 active:scale-95 border border-gray-300"
          >
            <Scan size={20} className="text-orange-600" />
            <span className="text-sm mt-1">Scan QR</span>
          </button>
        </div>
      </div>

      {/* Action Buttons (Hold, Void, Payment) */}
      <div className="flex flex-col gap-3 pt-2">
         <div className="flex items-center justify-center p-3 text-white rounded-xl w-full bg-orange-600">
          <span>Total:</span>
          <span>Rs{finalTotal.toFixed(2)}</span>
        </div>
        <div className="flex gap-1 ">
        <button
          onClick={() => setIsTransactionHeldInfoModalOpen(true)}
          className="flex items-center justify-center w-full p-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-transform duration-200 active:scale-95 text-base font-bold"
        >
          <Hand size={20} className="mr-1" /> Hold
        </button>
        <button
          onClick={() => setIsVoidConfirmModalOpen(true)}
          className="flex items-center justify-center p-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-transform duration-200 active:scale-95 text-base font-bold w-full"
        >
          <RefreshCcw size={20}/> Reset
        </button>
        <button
          onClick={handlePayNow}
          className="flex items-center justify-center w-full p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform duration-200 active:scale-95 text-base font-bold col-span-2"
        >
          <DollarSign size={20} className="mr-1" /> Payment
        </button></div>
      </div>
</div>
     
    </div>
  );
};

// --- Product Grid Component ---
interface ProductGridProps {
  products: Product[];
  categories: string[];
  addToCart: (product: Product) => void;
  searchTerm: string; // Add searchTerm prop
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

    // Filter by search term
    if (searchTerm) {
      currentProducts = currentProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All Categories") {
      currentProducts = currentProducts.filter((p) => p.category === selectedCategory);
    }
    
    return currentProducts;
  }, [products, selectedCategory, searchTerm]);

  return (
    <div className="flex-1 p-4 bg-white shadow-lg rounded-lg flex flex-col h-screen   ">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedCategory("All Categories")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-200
            ${
              selectedCategory === "All Categories"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-200
              ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-auto flex-grow custom-scrollbar">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            No products found matching your criteria.
          </div>
        ) : (
          filteredProducts.map((item) => (
            <div
              key={item.id}
              className="rounded-lg bg-gray-50 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden h-[12rem]"
              onClick={() => addToCart(item)} // Directly adds to cart
            >
              <div className="relative">
                <img
                  src={item.image || "https://img.freepik.com/free-photo/top-view-table-full-food_23-2149209253.jpg"}
                  alt={item.name}
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
                <center className="font-bold text-sm sm:text-base mb-1 truncate">{item.name}</center>
                <center className="text-xs text-gray-600">ID: {item.id}</center>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// --- Main Page Component ---
const POSSystem: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Header States
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [selectedRegister, setSelectedRegister] = useState<string>('');

  // Modal states for various functionalities
  const [isScanModalOpen, setIsScanModalOpen] = useState<boolean>(false);
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState<boolean>(false);
  const [paymentMethodType, setPaymentMethodType] = useState<'cash' | 'debit' | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState<boolean>(false);
  // const [isResetConfirmModalOpen, setIsResetConfirmModalOpen] = useState<boolean>(false); // Removed, replaced by clearCart in header/cart
  const [isVoidConfirmModalOpen, setIsVoidConfirmModalOpen] = useState<boolean>(false);
  const [isCartEmptyInfoModalOpen, setIsCartEmptyInfoModalOpen] = useState<boolean>(false);
  const [isTransactionHeldInfoModalOpen, setIsTransactionHeldInfoModalOpen] = useState<boolean>(false);
  const [isAmountInsufficientInfoModalOpen, setIsAmountInsufficientInfoModalOpen] = useState<boolean>(false);
  const [isOrderHistoryModalOpen, setIsOrderHistoryModalOpen] = useState<boolean>(false);
  const [isDailySalesSummaryModalOpen, setIsDailySalesSummaryModalOpen] = useState<boolean>(false);

  // State for Post-Payment Personalized Message
  const [personalizedCustomerMessage, setPersonalizedCustomerMessage] = useState<string>('');
  const [isGeneratingPersonalizedMessage, setIsGeneratingPersonalizedMessage] = useState<boolean>(false);

  // Calculate totals
  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.total, 0),
    [cartItems]
  );
  const tax = useMemo(() => subtotal * 0.05, [subtotal]); // 5% tax example
  const discount = useMemo(() => subtotal * 0.1, [subtotal]); // 10% discount example
  const finalTotal = useMemo(
    () => subtotal + tax - discount,
    [subtotal, tax, discount]
  );

  // Function to add a product to the cart
  const addToCart = useCallback((product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.price,
              }
            : item
        );
      } else {
        return [
          ...prevItems,
          { ...product, quantity: 1, total: product.price },
        ];
      }
    });
  }, []);

  // Function to update item quantity in cart
  const updateQuantity = useCallback((id: string, newQuantity: number) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: newQuantity,
                  total: newQuantity * item.price,
                }
              : item
          )
          .filter((item) => item.quantity > 0) // Remove if quantity becomes 0 or less
    );
  }, []);

  // Handle a specific payment method click (Cash, Debit)
  const handlePaymentMethodClick = useCallback((type: 'cash' | 'debit') => {
    if (cartItems.length === 0) {
      setIsCartEmptyInfoModalOpen(true);
      return;
    }
    setPaymentMethodType(type);
    setIsPaymentMethodModalOpen(true);
  }, [cartItems.length]);

  // Callback from PaymentMethodModal when confirmed
  const onSpecificPaymentSuccess = useCallback(() => {
    setIsPaymentMethodModalOpen(false);
    setIsReceiptModalOpen(true); // Open the new ReceiptModal
    setPersonalizedCustomerMessage(''); // Clear any previous message
    setIsGeneratingPersonalizedMessage(false); // Reset loading state
    // For a real app, you'd save the transaction to a database here
    // For this mock, we'll clear the cart AFTER the receipt is viewed/printed
  }, []);

  // Callback for insufficient cash
  const onAmountInsufficient = useCallback(() => {
    setIsAmountInsufficientInfoModalOpen(true);
  }, []);

  // Handle Pay Now button
  const handlePayNow = useCallback(() => {
    if (cartItems.length === 0) {
      setIsCartEmptyInfoModalOpen(true);
      return;
    }
    handlePaymentMethodClick('cash');
  }, [cartItems.length, handlePaymentMethodClick]);


  // New function to clear the cart (used by "Clear Cart" in Header and "Clear All" in CartSummary)
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);


  // Handle Void button (Cancel Transaction)
  const handleVoidTransaction = useCallback(() => {
    setIsVoidConfirmModalOpen(true);
  }, []);

  const confirmVoidTransaction = useCallback(() => {
    setCartItems([]);
    setIsVoidConfirmModalOpen(false);
  }, []);

  // --- Gemini API Integration Functions ---

  // Function to generate a personalized customer message after payment
  const generatePersonalizedMessage = useCallback(async () => {
    setIsGeneratingPersonalizedMessage(true);
    setPersonalizedCustomerMessage(''); // Clear previous message

    const orderDetails = cartItems.map(item => `${item.quantity} ${item.name}`).join(', ');
    const prompt = `Generate a short, friendly, and appreciative message for a customer who just completed an order. Their order included: ${orderDetails}. The total amount was Rs${finalTotal.toFixed(2)}. Encourage them to visit again and maybe mention a loyalty program. Keep it under 50 words.`;

    const chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = ""; // Canvas will automatically provide it in runtime
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setPersonalizedCustomerMessage(text);
      } else {
        setPersonalizedCustomerMessage("Thank you for your order!");
      }
    } catch (error) {
      console.error("Error generating personalized message:", error);
      setPersonalizedCustomerMessage("Thank you for your order! We appreciate your business.");
    } finally {
      setIsGeneratingPersonalizedMessage(false);
    }
  }, [cartItems, finalTotal]);


  return (
    <div className="flex flex-col  lg:h-screen bg-gray-100 font-inter overflow-scroll">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
        selectedRegister={selectedRegister}
        setSelectedRegister={setSelectedRegister}
        setIsOrderHistoryModalOpen={setIsOrderHistoryModalOpen}
        setIsDailySalesSummaryModalOpen={setIsDailySalesSummaryModalOpen}
      />

      <main className="flex flex-col lg:flex-row flex-grow p-4 gap-4 overflow-hidden">
        {/* Left Panel: Cart Summary */}
        <CartSummary
          cartItems={cartItems}
          subtotal={subtotal}
          tax={tax}
          discount={discount}
          finalTotal={finalTotal}
          updateQuantity={updateQuantity}
          handlePaymentMethodClick={handlePaymentMethodClick}
          setIsScanModalOpen={setIsScanModalOpen}
          // setIsResetConfirmModalOpen={setIsResetConfirmModalOpen} // Removed
          setIsVoidConfirmModalOpen={setIsVoidConfirmModalOpen}
          setIsTransactionHeldInfoModalOpen={setIsTransactionHeldInfoModalOpen}
          setIsDailySalesSummaryModalOpen={setIsDailySalesSummaryModalOpen}
          // setIsOrderHistoryModalOpen={setIsOrderHistoryModalOpen} // Removed
          handlePayNow={handlePayNow}
          clearCart={clearCart} // Pass clearCart to CartSummary
        />

        {/* Right Panel: Product Grid */}
        <ProductGrid
          products={MOCK_PRODUCTS}
          categories={CATEGORIES}
          addToCart={addToCart}
          searchTerm={searchTerm} // Pass searchTerm to ProductGrid
        />
      </main>

      {/* Modals */}
      <PaymentMethodModal
        isOpen={isPaymentMethodModalOpen}
        onClose={() => setIsPaymentMethodModalOpen(false)}
        type={paymentMethodType || 'cash'}
        total={finalTotal}
        onPaymentSuccess={onSpecificPaymentSuccess}
        onAmountInsufficient={onAmountInsufficient}
      />

      <InfoModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        title="Scan QR Code"
        message="This functionality would allow scanning a QR code for payment."
      />

      <InfoModal
        isOpen={isCartEmptyInfoModalOpen}
        onClose={() => setIsCartEmptyInfoModalOpen(false)}
        title="Cart Empty"
        message="Please add items to the cart before proceeding."
      />

      <InfoModal
        isOpen={isTransactionHeldInfoModalOpen}
        onClose={() => setIsTransactionHeldInfoModalOpen(false)}
        title="Transaction Held"
        message="The current transaction has been put on hold. You can retrieve it later."
      />

      <InfoModal
        isOpen={isAmountInsufficientInfoModalOpen}
        onClose={() => setIsAmountInsufficientInfoModalOpen(false)}
        title="Amount Insufficient"
        message="The amount received is less than the total due. Please collect the full amount."
      />

     

      <ConfirmationModal
        isOpen={isVoidConfirmModalOpen}
        onClose={() => setIsVoidConfirmModalOpen(false)}
        onConfirm={confirmVoidTransaction}
        title="Confirm Void Transaction"
        message="Are you sure you want to void this transaction? All cart items will be cleared."
      />

      {/* Receipt Modal (replaces old Payment Successful InfoModal) */}
      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => { setIsReceiptModalOpen(false); setCartItems([]); }} // Clear cart when receipt modal closes
        cartItems={cartItems}
        subtotal={subtotal}
        tax={tax}
        discount={discount}
        finalTotal={finalTotal}
        personalizedCustomerMessage={personalizedCustomerMessage}
        isGeneratingPersonalizedMessage={isGeneratingPersonalizedMessage}
        generatePersonalizedMessage={generatePersonalizedMessage}
      />

      {/* Daily Sales Summary Modal */}
      <DailySalesSummaryModal
        isOpen={isDailySalesSummaryModalOpen}
        onClose={() => setIsDailySalesSummaryModalOpen(false)}
        transactions={MOCK_TRANSACTIONS} // Pass mock transactions for summary
      />

      {/* Order History / Transaction List Modal */}
      <OrderHistoryModal
        isOpen={isOrderHistoryModalOpen}
        onClose={() => setIsOrderHistoryModalOpen(false)}
        transactions={MOCK_TRANSACTIONS}
      />

    </div>
  );
};

export default POSSystem;
