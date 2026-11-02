
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.import" });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or secret key in .env.import");
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchJSON(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed: ${url} (${response.status})`);
  }

  return response.json();
}

async function importData() {
  console.log("1. Fetching categories...");

  const categories = await fetchJSON(
    "https://dummyjson.com/products/categories"
  );

  const categoryRows = categories.map((category) => ({
    name: category.name,
    slug: category.slug,
  }));

  const { data: savedCategories, error: categoryError } =
    await supabase
      .from("categories")
      .upsert(categoryRows, { onConflict: "slug" })
      .select("id, slug");

  if (categoryError) throw categoryError;

  const categoryMap = new Map(
    savedCategories.map((category) => [
      category.slug,
      category.id,
    ])
  );

  console.log(`Imported ${savedCategories.length} categories.`);

  console.log("2. Fetching all products...");

  const result = await fetchJSON(
    "https://dummyjson.com/products?limit=0"
  );

  const products = result.products;

  console.log(`Found ${products.length} products.`);

  const productRows = products.map((product) => {
    const categoryId = categoryMap.get(product.category);

    if (!categoryId) {
      throw new Error(
        `Category not found: ${product.category}`
      );
    }

    return {
      dummyjson_id: product.id,
      title: product.title,
      description: product.description,
      category_id: categoryId,
      price: product.price,
      discount_percentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand ?? null,
      sku: product.sku ?? null,
      tags: product.tags ?? [],
      thumbnail: product.thumbnail ?? null,
      images: product.images ?? [],
      weight: product.weight ?? null,
  dimensions: product.dimensions ?? null,
  warranty_information: product.warrantyInformation ?? null,
  shipping_information: product.shippingInformation ?? null,
  availability_status: product.availabilityStatus ?? null,
  return_policy: product.returnPolicy ?? null,
  minimum_order_quantity: product.minimumOrderQuantity ?? null,
    };
  });

  console.log("3. Inserting products...");

  const batchSize = 50;

  for (let i = 0; i < productRows.length; i += batchSize) {
    const batch = productRows.slice(i, i + batchSize);

    const { error } = await supabase
      .from("products")
      .upsert(batch, { onConflict: "dummyjson_id" });

    if (error) throw error;

    console.log(
      `Imported ${Math.min(i + batch.length, productRows.length)} / ${productRows.length}`
    );
  }

  console.log("4. Import completed successfully!");
}

importData().catch((error) => {
  console.error("IMPORT FAILED:", error.message);
  process.exitCode = 1;
});
