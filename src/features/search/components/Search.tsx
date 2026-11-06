import { useEffect, useRef, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { useSearchProducts } from "../hooks/useSearchProducts";
import Searchform from "./SearchForm";
import SearchSuggetion from "./SearchSuggestions";
import type { FormEvent } from "react";
const SearchInput=()=>{
const [isSearchOpen, setIsSearchOpen] = useState(false);
const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
const searchRef = useRef(null)
const location = useLocation();
const navigate = useNavigate();
 useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(input.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);
const {
    data: results = [],
    isFetching,
    isError,
  } = useSearchProducts(debouncedInput);
const handleFocus=()=>{
setIsSearchOpen(true)
}

useEffect(() => {
    setInput("");
    setDebouncedInput("");
    setIsSearchOpen(false);
  }, [location.pathname, location.search]);


const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();


  const searchValue = input.trim();

  if (!searchValue) return;

  setIsSearchOpen(false);

  navigate(`/products/search?q=${encodeURIComponent(searchValue)}`);
};


return(
    <div className="relative p-2  lg:w-150" ref={searchRef}>
      <Searchform
        setInput={setInput}
        handleSubmit={handleSubmit}
        handelfocus={handleFocus}
        input={input}
        setIsSearchOpen={setIsSearchOpen}
        isSearchOpen={isSearchOpen}
      />

      {isSearchOpen && (
        <>
          <SearchSuggetion
            input={input}
            results={results}
            isLoading={isFetching && debouncedInput.length >= 2}
            isError={isError}
            setIsSearchOpen={setIsSearchOpen}
          />

          <div
            className="fixed inset-0 z-10 bg-black/40"
            onClick={() => setIsSearchOpen(false)}
          />
        </>
      )}
    </div>
)

}
export default SearchInput