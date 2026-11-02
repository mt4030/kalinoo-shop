import { getSearchPageProducts,
   type SearchPageOptions
 } from "@/features/products/services/productsService";
import { useQuery } from "@tanstack/react-query";


export function useSearchPageProducts(options: SearchPageOptions) {
  return useQuery({
    queryKey: ["search-products", options],
    queryFn: () => getSearchPageProducts(options),
  });
}