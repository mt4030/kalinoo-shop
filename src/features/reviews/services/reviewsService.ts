import { supabase } from "@/lib/supabase";


export async function getProductReviews(productId: number) {
  const { data, error } = await supabase
    .from("reviews")
    .select(`
      id,
      product_id,
      reviewer_name,
      rating,
      comment,
      is_demo,
      created_at
    `)
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}