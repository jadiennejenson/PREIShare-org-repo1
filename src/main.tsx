import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

// Replace missing ./styles/* imports with the repository's existing CSS files.
import "./index.css";
import "./App.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing #root element");
}

const root = createRoot(rootElement);
root.render(<App />);
