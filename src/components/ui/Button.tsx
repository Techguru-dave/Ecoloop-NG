import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-opacity-90 active:bg-opacity-80',
        secondary: 'bg-gray-200 text-text hover:bg-gray-300 active:bg-gray-400',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:bg-opacity-5 active:bg-opacity-10',
        ghost: 'text-primary hover:bg-primary hover:bg-opacity-10 active:bg-opacity-20',
        danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800'
      },
      size: {
        sm: 'px-3 py-1.5 text-sm h-8',
        md: 'px-4 py-2 text-base h-10',
        lg: 'px-6 py-3 text-lg h-12'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
)

Button.displayName = 'Button'
export default Button
