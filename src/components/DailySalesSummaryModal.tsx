// components/DailySalesSummaryModal.tsx
import React from 'react';
import { Modal } from './Modal';
import { Transaction } from '@/lib/mocks'; // Adjusted import

interface DailySalesSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

const DailySalesSummaryModal: React.FC<DailySalesSummaryModalProps> = ({ isOpen, onClose, transactions }) => {
  const today = new Date().toISOString().slice(0, 10);
  const todaysSales = transactions.filter(t => t.date.startsWith(today));

  const totalRevenue = todaysSales.reduce((sum, t) => sum + t.total, 0);
  const totalTransactions = todaysSales.length;
  const itemsSold = todaysSales.reduce((sum, t) => sum + t.items.reduce((s, item) => s + item.quantity, 0), 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Daily Sales Summary">
      <div className="p-4 text-gray-800 dark:text-gray-200">
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
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
          This is a mock summary. In a real application, this data would be dynamically loaded and aggregated.
        </p>
      </div>
    </Modal>
  );
};

export { DailySalesSummaryModal };