
import { getBrandsByCategory } from "@/features/products/services/productsService";
import { useQuery } from "@tanstack/react-query";


export function useBrands(category: string) {
  return useQuery({
    queryKey: ["brands", category],
    queryFn: () => getBrandsByCategory(category),
  });
}
