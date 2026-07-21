import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { SearchSuggestions } from "./searchsuggestions"
import { useSearch } from "@/contexts/searchcontext"
import { useRecommendation } from "@/contexts/recommendationcontext"

export function SearchBar() {

    const { searchQuery } = useSearch()
    const { getSimilarMoviesList } = useRecommendation()

    const handleSearch = async () => {
        await getSimilarMoviesList(searchQuery)
    }

    return (
        <Field orientation="horizontal" className="w-full max-w-fit">
            <SearchSuggestions />
            <Button type="button" onClick={handleSearch}>Search</Button>
        </Field>
    )
}

export default SearchBar
