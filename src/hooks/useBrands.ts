
import { useQuery } from "@tanstack/react-query";
import { getBrandsByCategory } from "@/services/productsService";

export function useBrands(category: string) {
  return useQuery({
    queryKey: ["brands", category],
    queryFn: () => getBrandsByCategory(category),
  });
}
