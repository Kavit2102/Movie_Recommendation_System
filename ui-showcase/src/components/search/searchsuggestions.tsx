import { useEffect, useState } from "react"
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import capitalizeFirstLetter from "@/ulils"
import { useSearch } from "@/contexts/searchcontext"

export function SearchSuggestions() {

    const [movies, setmovies] = useState([])
    const { searchQuery, setSearchQuery } = useSearch()

    async function searchMovieList() {
        try {
            const movies = await fetch(`movie-recommendation-system-server-seven.vercel.app/movies`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await movies.json()
            setmovies(data.movies)
        } catch (error) {
            console.error('Error fetching movies:', error)
        }
    }

    const handleSelect = (value: string | null) => {
        setSearchQuery(value ?? "")
    }

    useEffect(() => {
        searchMovieList()
    }, [])


    return (
        <Combobox items={movies} onValueChange={handleSelect}>
            <ComboboxInput placeholder="Select a movie" value={capitalizeFirstLetter(searchQuery)} />
            <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                    {(item) => (
                        <ComboboxItem key={item?.id} value={item?.title}>
                            {capitalizeFirstLetter(item?.title)}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}

export default SearchSuggestions