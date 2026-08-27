import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-display font-medium tracking-[0.15em] uppercase transition-all duration-300 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed select-none rounded-none";

  const variants = {
    primary: "bg-[#F5F5F0] text-[#0A0A0A] hover:bg-white border border-[#F5F5F0]",
    secondary: "bg-[#151515] text-[#F5F5F0] hover:bg-[#1F1F1F] border border-[#262626]",
    outline: "bg-transparent text-[#F5F5F0] border border-[#F5F5F0]/30 hover:border-[#F5F5F0] hover:bg-[#F5F5F0]/5",
    accent: "bg-[#B8A47E] text-[#0A0A0A] hover:bg-[#A3916D]",
    ghost: "bg-transparent text-[#F5F5F0]/70 hover:text-[#F5F5F0] hover:bg-[#151515]",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-xs",
    lg: "px-8 py-4 text-sm",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-3.5 w-3.5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          PROCESSING
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
