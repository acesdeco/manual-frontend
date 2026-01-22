import { Eye, EyeOff } from "lucide-react"
import { type FC, useRef, useState } from "react"
import type { ControllerRenderProps } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type PasswordFieldProps = {
  field:
    | ControllerRenderProps<{ password: string }, "password">
    | ControllerRenderProps<{ confirmPassword: string }, "confirmPassword">
  placeholder: string
  className?: string
}

export const PasswordField: FC<PasswordFieldProps> = ({
  field,
  placeholder,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const toggleVisibility = () => {
    setShowPassword((v) => !v)
    // Keep focus on input after toggle
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  return (
    <div className={cn("relative", className)}>
      <Input
        {...field}
        ref={inputRef}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="pr-10"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={toggleVisibility}
        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
      >
        {showPassword ? (
          <EyeOff className="size-4 text-muted-foreground" />
        ) : (
          <Eye className="size-4 text-muted-foreground" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>
    </div>
  )
}

export default PasswordField
