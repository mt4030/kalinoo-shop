
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.import" });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

async function importReviews() {
  try {
    // 1. Fetch all products and their nested reviews
    console.log("1. Fetching products from DummyJSON...");

    const response = await fetch(
      "https://dummyjson.com/products?limit=0"
    );

    if (!response.ok) {
      throw new Error(`DummyJSON error: ${response.status}`);
    }

    const { products } = await response.json();

    console.log(`Found ${products.length} products.`);

    // 2. Get products from Supabase
    console.log("2. Fetching Supabase product IDs...");

    const { data: dbProducts, error: productsError } =
      await supabase
        .from("products")
        .select("id, dummyjson_id");

    if (productsError) throw productsError;

    // DummyJSON ID -> Supabase ID
    const productIdMap = new Map(
      dbProducts.map((product) => [
        Number(product.dummyjson_id),
        product.id,
      ])
    );

    // 3. Extract and transform reviews
    console.log("3. Preparing reviews...");

    const reviewRows = [];

    for (const product of products) {
      const supabaseProductId = productIdMap.get(product.id);

      if (!supabaseProductId) {
        console.warn(
          `Product ${product.id} not found in Supabase.`
        );
        continue;
      }

      for (const review of product.reviews ?? []) {
        reviewRows.push({
          product_id: supabaseProductId,
          user_id: null,
          reviewer_name: review.reviewerName,
          rating: review.rating,
          comment: review.comment,
          is_demo: true,
          created_at: review.date,
        });
      }
    }

    console.log(`Prepared ${reviewRows.length} reviews.`);

    if (reviewRows.length === 0) {
      throw new Error("No reviews found. Nothing was imported.");
    }

    // 4. Remove previous demo reviews
    console.log("4. Deleting previous demo reviews...");

    const { error: deleteError } = await supabase
      .from("reviews")
      .delete()
      .eq("is_demo", true);

    if (deleteError) throw deleteError;

    // 5. Insert reviews in batches
    console.log("5. Importing reviews...");

    const batchSize = 100;

    for (let i = 0; i < reviewRows.length; i += batchSize) {
      const batch = reviewRows.slice(i, i + batchSize);

      const { error } = await supabase
        .from("reviews")
        .insert(batch);

      if (error) throw error;

      console.log(
        `Imported ${Math.min(i + batchSize, reviewRows.length)} / ${reviewRows.length}`
      );
    }

    console.log("6. Reviews imported successfully!");

  } catch (error) {
    console.error("IMPORT FAILED:", error.message);
    process.exitCode = 1;
  }
}

importReviews();
