
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../services/productsService";

export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: ["products", "category", category],
    queryFn: () => getProductsByCategory(category),
    enabled: Boolean(category),
  });
}
