import { getSearchPageProducts,
   type SearchPageOptions
 } from "@/features/products/services/productsService";

import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";



export function useSearchPageProducts(options: SearchPageOptions) {
  return useQuery({
    queryKey: ["search-products", options],
    queryFn: () => getSearchPageProducts(options),
    placeholderData: keepPreviousData,
  });
}