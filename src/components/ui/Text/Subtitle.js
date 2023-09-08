import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const subtitleVariants = cva(
  "text-sm text-gray-500",
  {
    variants: {
      variant: {
        default: "",
        
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Subtitle = ({ className, variant, size, ...props }) => {
  return (
    <div
      className={cn(subtitleVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export default Subtitle;
