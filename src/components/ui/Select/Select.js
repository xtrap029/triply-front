import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const selectVariants = cva(
  "bg-stone-800 border border-zinc-700 rounded-lg block w-full p-3",
  {
    variants: {
      variant: {
        default: "",
        outline: "",
      },
      size: {
        default: "",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Select = ({ className, variant, size, ...props }) => {
  return (
    <select
      className={cn(selectVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export default Select;
