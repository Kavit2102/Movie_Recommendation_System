// import { Button } from "@/components/ui/button"

// import MovieGrid from "./components/search/SearchResults"
// import SearchBar from "./components/search/SearchBar"
// import { useState } from "react"
import { Toaster } from "sonner"
import Header from "./components/header"
import MovieGrid from "./components/movie/moviegrid"
// import { SearchProvider, useSearch } from "./contexts/searchcontext"
import { useRecommendation } from "./contexts/recommendationcontext"

export function App() {

  const { similarMovies, isLoading } = useRecommendation()

  return (
    <div className="flex flex-col items-stretch gap-8 md:p-6 my-4 md:my-6">
      <Header />
      <div className="space-y-4">
        {isLoading && (
          <p className="text-sm text-muted-foreground">Loading recommendations...</p>
        )}
        {!isLoading && similarMovies.length === 0 && (
          <p className="px-4 text-sm text-muted-foreground">
            Select a movie to see similar recommendations.
          </p>
        )}
      </div>
      <MovieGrid />
      <Toaster />
    </div>
  )
}

export default App
