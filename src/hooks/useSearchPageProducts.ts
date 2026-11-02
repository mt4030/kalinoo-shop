import { useQuery } from "@tanstack/react-query";
import {
  getSearchPageProducts,
  type SearchPageOptions,
} from "@/services/productsService";

export function useSearchPageProducts(options: SearchPageOptions) {
  return useQuery({
    queryKey: ["search-products", options],
    queryFn: () => getSearchPageProducts(options),
  });
}