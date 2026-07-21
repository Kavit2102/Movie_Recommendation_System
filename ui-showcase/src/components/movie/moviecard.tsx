import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import capitalizeFirstLetter from "@/ulils"

interface MovieRecommendation {
    id?: number | string
    title?: string
    poster?: string
    [key: string]: unknown
}

interface MovieCardProps {
    movie: MovieRecommendation
}

export function MovieCard({ movie }: MovieCardProps) {
    return (
        <Card className="relative w-full pt-0">
            <div className="absolute z-30 aspect-video bg-black/35" />
            <img
                loading="lazy"
                src={movie?.poster ?? "Image not available!!"}
                alt="Event cover"
                className="relative z-20 aspect-auto w-full object-cover"
            />
            <CardHeader>
                {/* <CardAction>
                    <Badge variant="secondary">Featured</Badge>
                </CardAction> */}
                <CardTitle className="text-sm">{capitalizeFirstLetter(movie?.title ?? "Untitled Movie")}</CardTitle>
                <CardDescription>
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button className="w-full">Watch Movie</Button>
            </CardFooter>
        </Card>
    )
}

export default MovieCard
