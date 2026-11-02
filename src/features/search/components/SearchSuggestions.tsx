
import { Link } from "react-router-dom";
import suggestionim from "../../assets/suggestion.gif";

type SearchProduct = {
  id: number;
  title: string;
  price: number;
  thumbnail: string | null;
  rating: number;
  brand: string | null;
};

type SearchSuggestionProps = {
  input: string;
  results: SearchProduct[];
  isLoading: boolean;
  isError: boolean;
  setIsSearchOpen: (open: boolean) => void;
};

const SearchSuggetion = ({
  input,
  results,
  isLoading,
  isError,
  setIsSearchOpen,
}: SearchSuggestionProps) => {
  const searchValue = input.trim();

  return (
    <section className="absolute z-20 top-full right-0 w-full max-w-4xl min-h-80 rounded-2xl bg-white p-4 pt-6 shadow-xl sm:p-10 ">
      {searchValue.length >= 2 && (
        <div className="flex flex-col gap-1">
          {isLoading && (
            <p className="text-right text-sm text-zinc-500">
              در حال جستجو...
            </p>
          )}

          {isError && (
            <p className="text-right text-sm text-red-500">
              خطا در دریافت محصولات. دوباره تلاش کنید.
            </p>
          )}

          {!isLoading && !isError && results.length === 0 && (
            <p className="text-right text-sm text-zinc-500">
              محصولی پیدا نشد.
            </p>
          )}

          {!isError &&
            results.slice(0, 5).map((product) => (
              <Link
                key={product.id}
                to={`/products/search?q=${encodeURIComponent(searchValue)}`}
                onClick={() => setIsSearchOpen(false)}
                className="flex items-center justify-between gap-3 rounded-xl p-3 transition hover:bg-gray-100 hover:shadow-sm"
              >
                <img
                  src={product.thumbnail ?? ""}
                  alt={product.title}
                  className="h-12 w-12 shrink-0 object-contain"
                />

                <div className="flex min-w-0 flex-col text-right">
                  <p className="truncate text-sm font-medium text-zinc-800">
                    {product.title}
                  </p>

                  <span className="mt-1 text-xs text-purple-600">
                    {product.brand ?? "برند نامشخص"}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      )}

      <div className="mt-6 border-t border-zinc-200 pt-5">
        <p className="mb-4 text-right text-base font-bold text-zinc-800">
          جستجوهای پرطرفدار
        </p>

        <div className="flex items-start gap-3">
          {[
            { label: "آیفون", query: "iphone" },
            { label: "لپ‌تاپ", query: "laptop" },
            { label: "هدفون", query: "headphone" },
          ].map((item) => (
            <Link
              key={item.query}
              to={`/products/search?q=${item.query}`}
              onClick={() => setIsSearchOpen(false)}
              className="font-bold text-purple-600 transition hover:text-purple-800 hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <img src={suggestionim} alt="" />
    </section>
  );
};

export default SearchSuggetion;
