import { toast, type ExternalToast } from "sonner";

export function responseErrorMessage(error: unknown) {
  return typeof error === "object" &&
    error !== null &&
    "result" in error &&
    typeof error.result === "string"
    ? error.result
    : error instanceof Error
      ? error.message
      : null;
}

export function responseErrorToast(
  error: unknown,
  options: ExternalToast = {},
) {
  toast.error("There was a problem with your request", {
    ...options,
    description: responseErrorMessage(error),
  });
}
