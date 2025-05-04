
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error | null;
  resetError?: () => void;
}

export const ErrorFallback = ({ error, resetError }: ErrorFallbackProps) => (
  <div className="flex items-center justify-center min-h-[200px] w-full flex-col p-4">
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>An error occurred</AlertTitle>
      <AlertDescription>
        {error?.message || "Something went wrong while rendering this component."}
      </AlertDescription>
    </Alert>

    <div className="flex gap-2">
      {resetError && (
        <Button 
          variant="outline" 
          onClick={resetError} 
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" /> Try Again
        </Button>
      )}
      
      <Button 
        onClick={() => window.location.href = '/'}
        className="flex items-center gap-2"
      >
        Return to Home
      </Button>
    </div>
  </div>
);

export const LoadingFallback = ({ message = "Loading..." }: { message?: string }) => (
  <div className="flex items-center justify-center min-h-[200px]">
    <Loader2 className="h-8 w-8 animate-spin mr-2" />
    <span>{message}</span>
  </div>
);

export const CardErrorBoundary = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary
    fallback={
      <div className="p-4 border rounded bg-muted/10">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Card Error</AlertTitle>
          <AlertDescription>
            There was an error loading or rendering this card component.
            Please try refreshing the page or contact support if the issue persists.
          </AlertDescription>
        </Alert>
      </div>
    }
    onError={(error) => {
      console.error("Card component error:", error);
    }}
  >
    {children}
  </ErrorBoundary>
);
