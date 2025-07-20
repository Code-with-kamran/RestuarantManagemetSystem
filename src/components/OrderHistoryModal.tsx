// components/OrderHistoryModal.tsx
import React from 'react';
import { Modal } from './Modal';
import { Transaction } from '@/lib/mocks'; // Adjusted import

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
          <p className="text-center text-gray-500 dark:text-gray-400">No past transactions found.</p>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">Order #{transaction.id}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{transaction.date}</span>
                </div>
                <div className="mb-2">
                  <p className="font-medium dark:text-gray-200">Items:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 ml-4">
                    {transaction.items.map((item, idx) => (
                      <li key={idx}>{item.name} (x{item.quantity}) - Rs{item.price.toFixed(2)}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between text-md font-semibold text-gray-800 dark:text-gray-100 border-t border-dashed border-gray-300 dark:border-gray-600 pt-2 mt-2">
                  <span>Total:</span>
                  <span className="text-blue-600">Rs{transaction.total.toFixed(2)}</span>
                </div>
                <div className="text-right text-sm text-gray-600 dark:text-gray-300 mt-1">
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

export { OrderHistoryModal };