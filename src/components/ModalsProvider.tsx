// components/ModalsProvider.tsx
import React from 'react';
import {
  CartItem,
  Transaction,
} from '@/lib/mocks';
import { PaymentMethodModal } from './PaymentMethodModal';
import { InfoModal } from './InfoModal';
import { ConfirmationModal } from './ConfirmationModal';
import { ReceiptModal } from './ReceiptModal';
import { DailySalesSummaryModal } from './DailySalesSummaryModal';
import { OrderHistoryModal } from './OrderHistoryModal';

interface ModalsProviderProps {
  // Scan Modal
  isScanModalOpen: boolean;
  setIsScanModalOpen: (isOpen: boolean) => void;

  // Payment Method Modal
  isPaymentMethodModalOpen: boolean;
  setIsPaymentMethodModalOpen: (isOpen: boolean) => void;
  paymentMethodType: 'cash' | 'debit' | null;
  finalTotal: number;
  onSpecificPaymentSuccess: () => void;
  onAmountInsufficient: () => void;

  // Info Modals
  isCartEmptyInfoModalOpen: boolean;
  setIsCartEmptyInfoModalOpen: (isOpen: boolean) => void;
  isTransactionHeldInfoModalOpen: boolean;
  setIsTransactionHeldInfoModalOpen: (isOpen: boolean) => void;
  isAmountInsufficientInfoModalOpen: boolean;
  setIsAmountInsufficientInfoModalOpen: (isOpen: boolean) => void;

  // Confirmation Modals
  isVoidConfirmModalOpen: boolean;
  setIsVoidConfirmModalOpen: (isOpen: boolean) => void;
  confirmVoidTransaction: () => void;

  // Receipt Modal
  isReceiptModalOpen: boolean;
  setIsReceiptModalOpen: (isOpen: boolean) => void;
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  personalizedCustomerMessage: string;
  isGeneratingPersonalizedMessage: boolean;
  generatePersonalizedMessage: () => void;

  // Daily Sales Summary Modal
  isDailySalesSummaryModalOpen: boolean;
  setIsDailySalesSummaryModalOpen: (isOpen: boolean) => void;

  // Order History Modal
  isOrderHistoryModalOpen: boolean;
  setIsOrderHistoryModalOpen: (isOpen: boolean) => void;
  mockTransactions: Transaction[];
}

const ModalsProvider: React.FC<ModalsProviderProps> = ({
  isScanModalOpen, setIsScanModalOpen,
  isPaymentMethodModalOpen, setIsPaymentMethodModalOpen, paymentMethodType, finalTotal, onSpecificPaymentSuccess, onAmountInsufficient,
  isCartEmptyInfoModalOpen, setIsCartEmptyInfoModalOpen,
  isTransactionHeldInfoModalOpen, setIsTransactionHeldInfoModalOpen,
  isAmountInsufficientInfoModalOpen, setIsAmountInsufficientInfoModalOpen,
  isVoidConfirmModalOpen, setIsVoidConfirmModalOpen, confirmVoidTransaction,
  isReceiptModalOpen, setIsReceiptModalOpen, cartItems, subtotal, tax, discount, personalizedCustomerMessage, isGeneratingPersonalizedMessage, generatePersonalizedMessage,
  isDailySalesSummaryModalOpen, setIsDailySalesSummaryModalOpen,
  isOrderHistoryModalOpen, setIsOrderHistoryModalOpen,
  mockTransactions,
}) => {
  return (
    <>
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

      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => { setIsReceiptModalOpen(false); }}
        cartItems={cartItems}
        subtotal={subtotal}
        tax={tax}
        discount={discount}
        finalTotal={finalTotal}
        personalizedCustomerMessage={personalizedCustomerMessage}
        isGeneratingPersonalizedMessage={isGeneratingPersonalizedMessage}
        generatePersonalizedMessage={generatePersonalizedMessage}
      />

      <DailySalesSummaryModal
        isOpen={isDailySalesSummaryModalOpen}
        onClose={() => setIsDailySalesSummaryModalOpen(false)}
        transactions={mockTransactions}
      />

      <OrderHistoryModal
        isOpen={isOrderHistoryModalOpen}
        onClose={() => setIsOrderHistoryModalOpen(false)}
        transactions={mockTransactions}
      />
    </>
  );
};

export { ModalsProvider };