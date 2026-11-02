import { supabase } from "./supabase";

const PRODUCT_COLUMNS = `
  id,
  title,
  description,
  price,
  discount_percentage,
  rating,
  stock,
  brand,
  category_id,
  thumbnail,
  images,
  tags,
  availability_status,
  weight,
  dimensions,
  warranty_information,
  shipping_information,
  return_policy,
  minimum_order_quantity
`;

export async function getProducts(page = 1, pageSize = 12) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS, { count: "exact" })
    .order("id", { ascending: true })
    .range(from, to);

  if (error) throw error;

  return {
    products: data,
    total: count ?? 0,
  };
}


export async function getProductsByCategory(categorySlug: string) {
  // First, find the category
  const { data: categoryData, error: categoryError } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .maybeSingle();

  if (categoryError) throw categoryError;

  if (!categoryData) {
    return [];
  }

  // Then, fetch products belonging to that category
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("category_id", categoryData.id)
    .order("id", { ascending: true });

  if (error) throw error;

  return data;
}


export async function getProductById(id: number) {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function searchProducts(searchTerm: string, limit = 5) {
  const { data, error } = await supabase
    .from("products")
    .select("id, title, price, thumbnail, rating, brand")
    .ilike("title", `%${searchTerm}%`)
    .limit(limit);

  if (error) throw error;

  return data;
}



export type SearchPageOptions = {
  query?: string;
  category?: string;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  discountedOnly?: boolean;
  sortBy?: "price_asc" | "price_desc" | "rating" | "discount";
  page?: number;
  pageSize?: number;
};


export async function getSearchPageProducts({
  query,
  category,
  brands = [],
  minPrice,
  maxPrice,
  minRating,
  discountedOnly = false,
  sortBy = "price_asc",
  page = 1,
  pageSize = 24,
}: SearchPageOptions) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let categoryId: number | undefined;

  if (category) {
    const { data: categoryData, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", category)
      .maybeSingle();

    if (categoryError) throw categoryError;

    if (!categoryData) {
      return { products: [], total: 0 };
    }

    categoryId = categoryData.id;
  }

  let request = supabase
    .from("products")
    .select(PRODUCT_COLUMNS, { count: "exact" });

  // Search by title.
  if (query?.trim()) {
    request = request.ilike("title", `%${query.trim()}%`);
  }

  // Filter by category.
  if (categoryId !== undefined) {
    request = request.eq("category_id", categoryId);
  }

  // Filter by one or more brands.
  if (brands.length > 0) {
    request = request.in("brand", brands);
  }

  // Filter by original price.
  if (minPrice !== undefined) {
    request = request.gte("price", minPrice);
  }

  if (maxPrice !== undefined) {
    request = request.lte("price", maxPrice);
  }

  // Filter by minimum rating.
  if (minRating !== undefined) {
    request = request.gte("rating", minRating);
  }

  // Show only products with a positive discount.
  if (discountedOnly) {
    request = request.gt("discount_percentage", 0);
  }

  // Apply sorting.
  switch (sortBy) {
    case "price_asc":
      request = request.order("price", { ascending: true });
      break;

    case "price_desc":
      request = request.order("price", { ascending: false });
      break;

    case "rating":
      request = request
        .order("rating", { ascending: false })
        .order("id", { ascending: true });
      break;

    case "discount":
      request = request
        .order("discount_percentage", { ascending: false })
        .order("id", { ascending: true });
      break;
  }

  // Pagination must happen after filters and sorting.
  const { data, error, count } = await request.range(from, to);

  if (error) throw error;

  return {
    products: data,
    total: count ?? 0,
  };
}
export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name", { ascending: true });

  if (error) throw error;

  return data;
}


export async function getBrandsByCategory(categorySlug: string) {
  let categoryId: number | undefined;

  // Resolve category slug to its database ID
  if (categorySlug) {
    const { data: categoryData, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .maybeSingle();

    if (categoryError) throw categoryError;
    if (!categoryData) return [];

    categoryId = categoryData.id;
  }

  // Fetch brands, optionally limited to one category
  let request = supabase
    .from("products")
    .select("brand")
    .not("brand", "is", null)
    .neq("brand", "");

  if (categoryId !== undefined) {
    request = request.eq("category_id", categoryId);
  }

  const { data, error } = await request;

  if (error) throw error;

  // Remove duplicate brands and sort alphabetically
const uniqueBrands = data
  .map((product) => product.brand)
  .filter((brand): brand is string => Boolean(brand?.trim()));

return [...new Set(uniqueBrands)].sort((a, b) =>
  a.localeCompare(b)
);
}
