// components/ReceiptModal.tsx
import React, { useCallback, useRef } from 'react';
import { Sparkles, Printer } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './ui/Button';
import { Skeleton } from './ui/Skeleton';
import { CartItem } from '@/lib/mocks'; // Adjusted import

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
          body { font-family: 'Inter', sans-serif; margin: 20px; color: #333; }
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
        <div ref={receiptRef} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-inner w-full max-w-sm border border-gray-200 dark:border-gray-600 dark:text-gray-100">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Your Store</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">Sales Receipt</p>
            <p className="text-xs text-gray-400 dark:text-gray-400 mt-1">{new Date().toLocaleString()}</p>
          </div>
          <div className="border-t border-dashed border-gray-300 dark:border-gray-600 my-4"></div>
          <div className="mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-1">
                <span>{item.name} (x{item.quantity})</span>
                <span>Rs{item.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-dashed border-gray-300 dark:border-gray-600 mb-2"></div>
          <div className="flex justify-between text-md">
            <span>Subtotal:</span>
            <span className="font-semibold">Rs{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-md">
            <span>Tax (5%):</span>
            <span className="font-semibold">Rs{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-md text-green-600">
            <span>Discount:</span>
            <span className="font-semibold">-Rs{discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-600 text-xl font-bold text-gray-800 dark:text-gray-100 mt-2">
            <span>Total:</span>
            <span>Rs{finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 mb-4">Payment processed successfully!</p>

        {personalizedCustomerMessage ? (
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200 text-sm italic mb-4 w-full">
            <h5 className="font-semibold mb-1">Personalized Message:</h5>
            <p>{personalizedCustomerMessage}</p>
          </div>
        ) : isGeneratingPersonalizedMessage ? (
          <Skeleton className="h-16 w-full mb-4 dark:bg-gray-700" />
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

export { ReceiptModal };