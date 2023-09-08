import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800",
  {
    variants: {
      variant: {
        default:
          "",
        gray:
          "bg-stone-800 hover:bg-stone-700 [&.active]:bg-stone-700",
        success:
          "dark:hover:bg-yellow-800 dark:bg-yellow-700 dark:text-gray-300",
        danger:
          "dark:hover:bg-red-900 dark:bg-red-800 dark:text-gray-300",
        outline:
          "border border-zinc-700 hover:bg-stone-800",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-4 rounded-md",
        lg: "px-5 py-5 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = ({ className, variant, size, ...props }) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export default Button;
