import "normalize.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Input } from "./components/ui/Input";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Input />
  </StrictMode>
);
