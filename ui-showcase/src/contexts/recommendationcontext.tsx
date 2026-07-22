import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { toast } from "sonner"

interface MovieRecommendation {
    id?: number | string
    title?: string
    poster?: string
    [key: string]: unknown
}

interface RecommendationContextType {
    similarMovies: MovieRecommendation[]
    getSimilarMoviesList: (movieName: string) => Promise<void>
    isLoading: boolean
    error: string | null
}

const RecommendationContext = createContext<RecommendationContextType | undefined>(
    undefined
)

export function RecommendationProvider({ children }: { children: ReactNode }) {
    const [similarMovies, setSimilarMovies] = useState<MovieRecommendation[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function getSimilarMoviesList(movieName: string) {
        if (!movieName.trim()) return

        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch(
                `https://movie-recommendation-system-server-seven.vercel.app/recommend?movie_name=${encodeURIComponent(movieName)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json()
            setSimilarMovies((data?.recommendations ?? []) as MovieRecommendation[])
        } catch (err) {
            console.error("Error fetching movies:", err)
            setError("Could not fetch recommendations")
            toast.error("Sorry!! Could not fetch recommendations")
            setSimilarMovies([])
        } finally {
            setIsLoading(false)
        }
    }

    const value = useMemo(
        () => ({
            similarMovies,
            getSimilarMoviesList,
            isLoading,
            error,
        }),
        [similarMovies, isLoading, error]
    )

    return (
        <RecommendationContext.Provider value={value}>
            {children}
        </RecommendationContext.Provider>
    )
}

export function useRecommendation() {
    const context = useContext(RecommendationContext)
    if (!context) {
        throw new Error("useRecommendation must be used within RecommendationProvider")
    }
    return context
}