import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={`
            flex h-10 w-full rounded-md border border-gray-700 
            bg-[#1e2937] px-3 py-2 text-sm text-white
            ring-offset-background file:border-0 
            file:bg-transparent file:text-sm file:font-medium 
            placeholder:text-gray-400 
            focus-visible:outline-none focus-visible:border-[#00FF9D] 
            focus-visible:ring-[#00FF9D] focus-visible:ring-opacity-50
            disabled:cursor-not-allowed disabled:opacity-50
            ${error ? "border-red-500" : ""}
            ${className}`}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
