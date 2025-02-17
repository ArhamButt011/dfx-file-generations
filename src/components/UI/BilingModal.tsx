import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  buttonContent: ReactNode
}

const BilingModal = ({ isOpen, onClose, children,buttonContent }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-4xl rounded-2xl p-6 shadow-lg relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-5 right-4"
          onClick={onClose}
        >
          {buttonContent}
        </button>
        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default BilingModal;
