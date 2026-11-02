import { useQuery } from "@tanstack/react-query";
import { getProductReviews } from "../services/reviewsService";

export function useProductReviews(productId: number) {
  return useQuery({
    queryKey: ["productReviews", productId],
    queryFn: () => getProductReviews(productId),
    enabled: Number.isInteger(productId) && productId > 0,
  });
}