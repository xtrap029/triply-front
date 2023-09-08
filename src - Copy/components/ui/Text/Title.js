import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const titleVariants = cva(
  "text-yellow-500 font-semibold mb-5",
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

const Title = ({ className, variant, size, ...props }) => {
  return (
    <div
      className={cn(titleVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export default Title;
