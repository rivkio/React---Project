// SearchContext.tsx
// SearchContext.tsx
import { ReactNode, createContext, useState } from "react";

interface SearchContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export const SearchContext = createContext<SearchContextType>({
    searchTerm: "",
    setSearchTerm: (term: string) => {},
});

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
};


