import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'filled' | 'outlined'
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'filled',
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const baseStyles =
    'px-4 sm:py-3 py-2 w-full text-[14px] sm:text-[16px] rounded-full transition font-medium'

  const variants: Record<'filled' | 'outlined', string> = {
    filled: 'bg-[#266CA8] text-white',
    outlined: 'border border-[#266CA8] text-[#266CA8] bg-white',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className} ${
        disabled && 'opacity-50 cursor-not-allowed'
      } `}
    >
      {children}
    </button>
  )
}

export default Button
