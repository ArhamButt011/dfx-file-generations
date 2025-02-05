import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BilingModal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-4xl rounded-2xl p-6 shadow-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-5 right-4 text-[#266CA8] font-semibold text-2xl"
          onClick={onClose}
        >
          Skip
        </button>
        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default BilingModal;
