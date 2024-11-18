import * as React from "react";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react"; // You can use any icon library, e.g., react-icons

import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  // You can optionally pass in a `type` to define the initial input type (password or text)
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    // Handle password visibility toggle
    const togglePasswordVisibility = (
      e: React.MouseEvent<HTMLButtonElement>
    ) => {
      e.preventDefault();
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="relative w-full">
        <input
          type={type === "password" && !showPassword ? "password" : "text"} // Toggle between password and text
          className={cn(
            " flex h-10 w-full rounded-lg border border-input bg-card px-3 py-1 text-sm shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary placeholder:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <Button
            onClick={togglePasswordVisibility}
            size={"icon"}
            variant={"ghost"}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 focus:outline-none"
          >
            {showPassword ? (
              <Eye className="h-3" />
            ) : (
              <EyeOff className="h-3" />
            )}
          </Button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
