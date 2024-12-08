interface SearchBarProps {
    search: string;
    setSearch: (searchTerm: string) => void;
}

export default function SearchBar({ search, setSearch }: SearchBarProps) {
    return (
        <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="mb-4 px-4 py-2 border rounded-lg w-full max-w-sm"
        />
    );
}

