// components/ConfirmationModal.tsx
import React from 'react';
import { Modal } from './Modal';
import { Button } from './ui/Button';

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
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          <Button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
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

export { ConfirmationModal };