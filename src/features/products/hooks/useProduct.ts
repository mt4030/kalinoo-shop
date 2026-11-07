import { useQuery } from "@tanstack/react-query";

import { getProductById } from "../services/productsService";

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: Number.isInteger(id) && id > 0,
  });
}