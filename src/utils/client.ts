import { type ExternalToast, toast } from "sonner"
import { ZodError, prettifyError } from "zod"

export function responseErrorMessage(error: unknown) {
  return typeof error === "object" &&
    error !== null &&
    "result" in error &&
    typeof error.result === "string"
    ? error.result
    : error instanceof ZodError
      ? prettifyError(error)
      : error instanceof Error
        ? error.message
        : null
}

export function responseErrorToast(
  error: unknown,
  options: ExternalToast = {},
) {
  toast.error("There was a problem with your request", {
    ...options,
    description: responseErrorMessage(error),
  })
}
