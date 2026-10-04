import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

// Ensure these files exist and match App.tsx imports
import "./index.css";
import "./App.css";

const rootEl = document.getElementById("root");
const root = createRoot(rootEl!);
root.render(<App />);
