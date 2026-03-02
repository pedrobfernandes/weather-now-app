import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UnitProvider } from "./context/UnitContext";
import { InfoModalProvider } from "./context/InfoModalContext";
import "./App.css";
import App from "./App";

const root = document.getElementById("root");
const rootCreator = createRoot(root!);

rootCreator.render(
    <StrictMode>
        <UnitProvider>
            <InfoModalProvider>
                <App />
            </InfoModalProvider>
        </UnitProvider>
    </StrictMode>
);
