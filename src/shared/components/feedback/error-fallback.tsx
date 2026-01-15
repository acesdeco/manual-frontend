import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorFallbackProps {
  error?: Error | null;
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorFallback({
  error,
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
}: ErrorFallbackProps) {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="size-6 text-destructive" />
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {error && (
          <CardContent>
            <div className="rounded-md bg-muted p-3">
              <code className="text-xs text-muted-foreground">
                {error.message}
              </code>
            </div>
          </CardContent>
        )}
        {onRetry && (
          <CardFooter className="justify-center">
            <Button onClick={onRetry} variant="outline">
              <RefreshCw className="mr-2 size-4" />
              Try again
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
