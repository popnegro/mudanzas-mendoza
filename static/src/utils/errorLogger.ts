/**
 * errorLogger.ts
 *
 * This utility provides functions for logging errors to a remote service.
 * In a real-world scenario, this would send data to an error tracking service
 * like Sentry, Bugsnag, LogRocket, or a custom API endpoint.
 */

interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  url?: string;
  userAgent?: string;
  timestamp: string;
  type: "client" | "react" | "unhandledrejection";
  context?: Record<string, any>;
}

export const logError = async (
  error: Error | PromiseRejectionEvent | any,
  info?: React.ErrorInfo | { type: "unhandledrejection" },
  context?: Record<string, any>,
) => {
  const errorData: ErrorInfo = {
    message:
      error instanceof Error
        ? error.message
        : error.reason?.message || error.message || "Unknown error",
    stack:
      error instanceof Error ? error.stack : error.reason?.stack || undefined,
    componentStack: (info as React.ErrorInfo).componentStack,
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
    type: (info as { type: "unhandledrejection" }).type || "client",
    context: context,
  };

  console.error("Logged Error:", errorData);

  // In a real application, you would send this data to a backend API or a third-party service.
  // Example:
  // try {
  //   await fetch('/api/log-error', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(errorData),
  //   });
  // } catch (loggingError) {
  //   console.warn('Failed to send error log to server:', loggingError);
  // }
};

export const initializeGlobalErrorHandlers = () => {
  window.onerror = (message, source, lineno, colno, error) => {
    logError(
      error || new Error(message as string),
      { type: "client" },
      { source, lineno, colno },
    );
  };

  window.onunhandledrejection = (event) => {
    logError(event, { type: "unhandledrejection" });
  };
};
