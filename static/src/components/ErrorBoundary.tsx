import * as React from "react";

import { logError } from "../utils/errorLogger";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  // This static method is called after an error has been thrown by a descendant component.
  // It receives the error that was thrown as a parameter.
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // This method is called after an error has been thrown.
  // It receives two parameters: the error that was thrown and an object with information about which component threw the error.
  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
    void logError(error, errorInfo, { component: "ErrorBoundary" });
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800 p-4 text-center">
          <h1 className="text-3xl font-bold mb-4">¡Oops! Algo salió mal.</h1>
          <p className="text-lg mb-6">
            Estamos trabajando para solucionar este problema. Por favor, intentá
            de nuevo más tarde.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors"
          >
            Recargar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
