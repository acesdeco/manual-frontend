import type { ComponentProps, FC } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LoadingSpinner } from "@/shared/components/feedback"

type AuthButtonProps = ComponentProps<typeof Button> & {
  isLoading: boolean
}

export const AuthButton: FC<AuthButtonProps> = ({
  children,
  className,
  isLoading,
  disabled,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={disabled || isLoading}
      className={cn("w-full", className)}
    >
      {isLoading ? <LoadingSpinner size="sm" /> : children}
    </Button>
  )
}

export default AuthButton
