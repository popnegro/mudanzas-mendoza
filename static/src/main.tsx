import * as React from "react";
import { StrictMode, createElement, createRoot } from "react";

import App from "./App.tsx";
import MendozaHomeShell from "./theme/MendozaHomeShell.tsx";
import "./index.css";

function RootRouter() {
  const [path, setPath] = React.useState(() => window.location.pathname);

  React.useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    const originalPushState = window.history.pushState.bind(window.history);
    const originalReplaceState = window.history.replaceState.bind(window.history);

    window.history.pushState = (...args) => {
      originalPushState(...args);
      window.dispatchEvent(new PopStateEvent("popstate"));
    };
    window.history.replaceState = (...args) => {
      originalReplaceState(...args);
      window.dispatchEvent(new PopStateEvent("popstate"));
    };

    window.addEventListener("popstate", onPopState);
    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return path === "/" ? createElement(MendozaHomeShell) : createElement(App);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootRouter />
  </StrictMode>,
);
