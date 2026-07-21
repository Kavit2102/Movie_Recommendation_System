import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { SearchProvider } from "./contexts/searchcontext.tsx"
import { RecommendationProvider } from "./contexts/recommendationcontext.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SearchProvider>
        <RecommendationProvider>
          <App />
        </RecommendationProvider>
      </SearchProvider>
    </ThemeProvider>
  </StrictMode>
)
