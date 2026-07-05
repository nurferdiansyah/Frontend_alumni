import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Button({ children, variant = 'primary', className, ...props }) {
  const baseStyle = "inline-flex items-center justify-center rounded-xl px-6 py-2.5 font-semibold transition-all duration-300";
  
  const variants = {
    primary: "bg-[#0F4C3A] text-white hover:bg-[#0a3629] shadow-md hover:shadow-lg hover:-translate-y-0.5",
    accent: "bg-[#7FE0B0] text-[#0F4C3A] hover:bg-[#66c698] shadow-md hover:shadow-lg hover:-translate-y-0.5",
    outline: "border-2 border-[#0F4C3A] text-[#0F4C3A] hover:bg-[#0F4C3A] hover:text-white hover:-translate-y-0.5",
    outlineWhite: "border-2 border-white text-white hover:bg-white hover:text-[#0F4C3A] hover:-translate-y-0.5",
    ghost: "text-[#0F4C3A] hover:bg-[#0F4C3A]/10"
  };

  return (
    <button className={cn(baseStyle, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
