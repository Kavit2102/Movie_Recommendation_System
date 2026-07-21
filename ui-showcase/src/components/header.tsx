import SearchBar from "./search/searchbar";

export default function Header() {
    return (
        <header className="flex items-center justify-between p-4 text-white">
            <h1 className="text-4xl font-bold">Movie Recommendation System</h1>
            <SearchBar />
        </header>
    )
}
