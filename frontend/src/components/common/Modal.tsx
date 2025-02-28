import { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={handleModalClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg p-6 shadow-lg flex flex-col items-center gap-4">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          onClick={handleModalClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
