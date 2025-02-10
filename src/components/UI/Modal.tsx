import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  buttonContent: string
}

const Modal = ({ isOpen, onClose, children, buttonContent }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-lg relative">
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
