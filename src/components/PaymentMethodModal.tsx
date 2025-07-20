// components/PaymentMethodModal.tsx
import React, { useState, useEffect } from 'react';
import { CreditCard } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './ui/Button';

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
          <span className="dark:text-gray-300">Amount Due:</span>
          <span className="text-blue-600">Rs{total.toFixed(2)}</span>
        </div>

        {type === 'cash' && (
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Amount Received:</label>
            <input
              type="number"
              value={amountReceived}
              onChange={(e) => setAmountReceived(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg text-2xl font-bold text-center focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              step="any"
              min="0"
            />
          </div>
        )}
        {type === 'debit' && (
          <div className="text-center text-gray-700 dark:text-gray-300">
            <p className="text-lg">Please insert/swipe card at the terminal.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Waiting for card payment confirmation...</p>
            <CreditCard size={64} className="mx-auto mt-6 text-blue-400 animate-pulse" />
          </div>
        )}

        {type === 'cash' && (
          <div className="flex justify-between items-center text-xl font-semibold pt-2 border-t border-dashed border-gray-300 dark:border-gray-600">
            <span className="dark:text-gray-300">Change Due:</span>
            <span className={changeDue >= 0 ? 'text-green-600' : 'text-red-600'}>Rs{changeDue.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <Button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
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

export { PaymentMethodModal };