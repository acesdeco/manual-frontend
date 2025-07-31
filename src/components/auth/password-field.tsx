import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { useState, type FC } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import Input from "../global/input";

type PasswordFieldProps = {
  field:
    | ControllerRenderProps<
        {
          password: string;
        },
        "password"
      >
    | ControllerRenderProps<
        {
          confirmPassword: string;
        },
        "confirmPassword"
      >;
  placeholder: string;
};

const PasswordField: FC<PasswordFieldProps> = ({ field, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="relative">
        <Input
          {...field}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="pr-[theme(size.7)]"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className={clsx(
            "absolute top-3 right-1 size-5",
            "[&>svg]:text-gray-300 [&>svg]:dark:text-gray-600 [&>svg]:size-full",
          )}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>
    </>
  );
};

export default PasswordField;
