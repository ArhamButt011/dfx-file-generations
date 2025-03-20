import React from 'react'
import { cn } from '@/lib/twMerge'

type LabelProps = {
  children: React.ReactNode
  className?: string
}

const Label: React.FC<LabelProps> = ({ children, className = '' }) => {
  return (
    <label
      className={cn(
        'block text-black font-semibold text-[14px] sm:text-[16px]',
        className,
      )}
    >
      {children}
    </label>
  )
}

export default Label
