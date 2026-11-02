
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../services/productsService";

export function useSearchProducts(searchTerm: string) {
  const term = searchTerm.trim();

  return useQuery({
    queryKey: ["searchProducts", term],
    queryFn: () => searchProducts(term, 5),
    enabled: term.length >= 2,
    staleTime: 1000 * 60,
  });
}
