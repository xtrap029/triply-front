import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const cardVariants = cva(
  "p-6 my-3 rounded-lg shadow",
  {
    variants: {
      variant: {
        default: "bg-opacity-30 bg-stone-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Card = ({ className, variant, ...props }) => {
  return (
    <div
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  );
};

export default Card;
