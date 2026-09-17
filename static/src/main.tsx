import * as React from "react";
import { StrictMode, createRoot } from "react-dom/client";

import MendozaHomeShell from "./theme/MendozaHomeShell.tsx";
import "./index.css";

const App = React.lazy(() => import("./App.tsx"));

function RootRouter() {
  const [path, setPath] = React.useState(() => window.location.pathname);

  React.useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  if (path === "/") {
    return <MendozaHomeShell />;
  }

  return (
    <React.Suspense fallback={null}>
      <App />
    </React.Suspense>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootRouter />
  </StrictMode>,
);
