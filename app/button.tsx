import type { ReactNode, ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const Button = ({ children, className, ...props }: ButtonProps) => (
  <button
    {...props}
    className={`
        flex justify-center items-center text-primary border-1 border-primary rounded-md cursor-pointer transition-all duration-150
        hover:shadow-aura shadow-primary/50 
        focus:outline-none focus:ring-2 focus:ring-primary hover:text-space hover:bg-primary 
        active:scale-90 
        disabled:cursor-not-allowed disabled:border-disabled disabled:text-disabled disabled:bg-space disabled:shadow-none disabled:scale-100 
        ${className}
        `}
  >
    {children}
  </button>
)
