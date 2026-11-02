import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productsService";

export function useProducts(page = 1, pageSize = 12) {
  return useQuery({
    queryKey: ["products", page, pageSize],
    queryFn: () => getProducts(page, pageSize),
  });
}