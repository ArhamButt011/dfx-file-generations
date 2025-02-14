import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  buttonContent: ReactNode
}

const Modal = ({ isOpen, onClose, children, buttonContent }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full md:max-w-lg max-w-[350px] rounded-2xl md:p-6 p-4 shadow-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          {buttonContent}
        </button>
        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
