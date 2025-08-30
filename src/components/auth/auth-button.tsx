import { cn } from "@/lib/utils";
import type { ComponentProps, FC } from "react";
import { Loader } from "../global/loader";

type AuthButtonProps = ComponentProps<"button"> & {
  isLoading: boolean;
};

const AuthButton: FC<AuthButtonProps> = ({
  children,
  className,
  isLoading,
  disabled,
  ...props
}) => {
  return (
    <>
      <button
        {...props}
        disabled={disabled || isLoading}
        className={cn(
          "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
          className,
        )}
      >
        {isLoading ? <Loader /> : children}
      </button>
    </>
  );
};

export default AuthButton;
