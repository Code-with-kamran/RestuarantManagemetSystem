// components/CartSummary.tsx
import React from 'react';
import { CreditCard, DollarSign, Hand, Scan, RefreshCcw, Percent } from 'lucide-react';
import { InputWithLabel } from './ui/Input-with-label';
import { CartItem } from '@/lib/mocks'; // Adjusted import

interface CartSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  discountPercentage: number;
  setDiscountPercentage: (percentage: number) => void;
  finalTotal: number;
  updateQuantity: (id: string, newQuantity: number) => void;
  handlePaymentMethodClick: (type: 'cash' | 'debit') => void;
  setIsScanModalOpen: (isOpen: boolean) => void;
  setIsVoidConfirmModalOpen: (isOpen: boolean) => void;
  setIsTransactionHeldInfoModalOpen: (isOpen: boolean) => void;
  handlePayNow: () => void;
  clearCart: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  cartItems,
  subtotal,
  tax,
  discount,
  discountPercentage,
  setDiscountPercentage,
  finalTotal,
  updateQuantity,
  handlePaymentMethodClick,
  setIsScanModalOpen,
  setIsVoidConfirmModalOpen,
  setIsTransactionHeldInfoModalOpen,
  handlePayNow,
}) => {
  return (
    <div className="flex-none w-full lg:w-1/3 p-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col h-screen lg:h-auto relative">
      {/* Cart Items Display */}
      <div
        className="overflow-auto flex-grow mb-4 custom-scrollbar"
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
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">No items in cart</div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-5 gap-2 items-center p-3 border-b border-gray-200 dark:border-gray-700 text-sm"
            >
              <div className="font-medium text-gray-800 dark:text-gray-100">{item.name}</div>
              <div className="text-center">
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value, 10))
                  }
                  className="w-16 text-center border border-gray-300 rounded-md p-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                />
              </div>
              <div className="text-right text-gray-700 dark:text-gray-200">
                Rs{item.price.toFixed(2)}
              </div>
              <div className="text-right font-semibold text-gray-800 dark:text-gray-100">
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

      <div className="absolute bottom-0 left-0 w-full bg-white dark:bg-gray-800 rounded-b-lg p-4">
        {/* Totals Section */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex justify-between text-sm text-gray-700 dark:text-gray-200">
            <span>Subtotal:</span>
            <span className="font-semibold">Rs{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700 dark:text-gray-200">
            <span>Tax (5%):</span>
            <span className="font-semibold">Rs{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-green-600 py-1">
            <InputWithLabel
              id="discount-input"
              label="%"
              type="number"
              value={discountPercentage}
              onChange={(e) => {
                const value = Math.max(0, Math.min(100, Number(e.target.value))); // Clamp between 0-100
                setDiscountPercentage(value);
              }}
              min="0"
              max="100"
              step="1"
              className="w-24 text-right pr-6 bg-white dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
              icon={<Percent size={16} />}
            />
            <span className="text-green-600 font-semibold">-Rs{discount.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method Buttons */}
        <div className="mb-1 pt-1">
          <h3 className="text-lg font-semibold mb-1 text-gray-700 dark:text-gray-100">Payment Method</h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handlePaymentMethodClick('cash')}
              className="flex flex-col items-center justify-center p-1 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition-transform duration-200 active:scale-95 border border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-600"
            >
              <DollarSign size={20} className="text-green-600" />
              <span className="text-sm mt-1">Cash</span>
            </button>
            <button
              onClick={() => handlePaymentMethodClick('debit')}
              className="flex flex-col items-center justify-center p-1 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition-transform duration-200 active:scale-95 border border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-600"
            >
              <CreditCard size={20} className="text-purple-600" />
              <span className="text-sm mt-1">Debit Card</span>
            </button>
            <button
              onClick={() => setIsScanModalOpen(true)}
              className="flex flex-col items-center justify-center p-1 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition-transform duration-200 active:scale-95 border border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-600"
            >
              <Scan size={20} className="text-orange-600" />
              <span className="text-sm mt-1">Scan QR</span>
            </button>
          </div>
        </div>

        {/* Action Buttons (Hold, Reset, Payment) */}
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-center justify-between p-3 text-white rounded-xl w-full bg-orange-600 text-lg font-bold">
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
              <RefreshCcw size={20} /> Reset
            </button>
            <button
              onClick={handlePayNow}
              className="flex items-center justify-center w-full p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform duration-200 active:scale-95 text-base font-bold col-span-2"
            >
              <DollarSign size={20} className="mr-1" /> Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CartSummary };