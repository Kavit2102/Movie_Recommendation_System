import { useRecommendation } from "@/contexts/recommendationcontext"
import { MovieCard } from "./moviecard"

function MovieGrid() {

    const { similarMovies } = useRecommendation()

    return (
        <div className="w-full space-y-4">
            <h2 className="p-4 text-white text-2xl font-semibold">Recommended movies</h2>
            <div className="p-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {similarMovies?.map((movie, index) => (
                    <MovieCard
                        key={String(movie?.id ?? `${movie?.title ?? "movie"}-${index}`)}
                        movie={movie}
                    />
                ))}
            </div>
        </div>
    )
}

export default MovieGrid