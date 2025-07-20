// components/InfoModal.tsx
import React from 'react';
import { Modal } from './Modal';
import { Button } from './ui/Button';

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
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{message}</p>
        <Button onClick={onClose} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          OK
        </Button>
      </div>
    </Modal>
  );
};

export { InfoModal };