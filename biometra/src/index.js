import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MemoryRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </MemoryRouter>
  </React.StrictMode>
);
