import { cn } from "@/lib/utils";
import type { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div className="flex flex-col mb-4">
      {label && <label className="mb-2 text-gray-700">{label}</label>}
      <input
        {...props}
        className={cn(
          "mt-1 block w-full pr-3 py-2 border-b-2 border-gray-300 focus:shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:border-gray-600",
          className,
        )}
      />
    </div>
  );
};

export default Input;
