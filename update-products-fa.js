
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

dotenv.config({ path: ".env.import" });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or secret key in .env.import");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const jsonPath = path.resolve(
  process.cwd(),
  "kalinoo-products-persian.json"
);

const APPLY_CHANGES = process.argv.includes("--apply");

function samePrice(a, b) {
  return Math.abs(Number(a) - Number(b)) < 0.000001;
}

function sameBrand(a, b) {
  return (a ?? null) === (b ?? null);
}

async function updateProducts() {
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`Persian JSON not found: ${jsonPath}`);
  }

  const persianProducts = JSON.parse(
    fs.readFileSync(jsonPath, "utf8")
  );

  if (!Array.isArray(persianProducts) || !persianProducts.length) {
    throw new Error("Invalid or empty Persian JSON.");
  }

  console.log(`Found ${persianProducts.length} Persian products.`);

  console.log("1. Fetching database products...");

  const { data: dbProducts, error } = await supabase
    .from("products")
    .select("dummyjson_id, category_id, price, brand")
    .order("dummyjson_id", { ascending: true });

  if (error) throw error;

  if (dbProducts.length !== persianProducts.length) {
    throw new Error(
      `Count mismatch: database ${dbProducts.length}, JSON ${persianProducts.length}`
    );
  }

  console.log("2. Validating product matching...");

  const seenIds = new Set();

  for (let i = 0; i < dbProducts.length; i++) {
    const db = dbProducts[i];
    const fa = persianProducts[i];

    if (db.dummyjson_id == null || seenIds.has(db.dummyjson_id)) {
      throw new Error(`Invalid or duplicate product ID at row ${i + 1}.`);
    }

    seenIds.add(db.dummyjson_id);

    if (!samePrice(db.price, fa.price)) {
      throw new Error(
        `Price mismatch at row ${i + 1}, ID ${db.dummyjson_id}. Aborting.`
      );
    }

    if (!sameBrand(db.brand, fa.brand)) {
      throw new Error(
        `Brand mismatch at row ${i + 1}, ID ${db.dummyjson_id}. Aborting.`
      );
    }

    if (
      !fa.title ||
      !fa.description ||
      !fa.category ||
      !Array.isArray(fa.tags) ||
      db.category_id == null
    ) {
      throw new Error(`Invalid data at row ${i + 1}. Aborting.`);
    }
  }

  // Map existing category IDs to Persian names.
  const categoryMap = new Map();

  for (let i = 0; i < dbProducts.length; i++) {
    const id = dbProducts[i].category_id;
    const name = persianProducts[i].category;

    if (categoryMap.has(id) && categoryMap.get(id) !== name) {
      throw new Error(`Conflicting Persian names for category ID ${id}.`);
    }

    categoryMap.set(id, name);
  }

  console.log("All products passed validation.");
  console.log(`${categoryMap.size} categories found.`);

  // Safe by default: running without --apply changes nothing.
  if (!APPLY_CHANGES) {
    console.log("\nDRY RUN: No database changes made.");
    console.log("To apply the changes, run:");
    console.log("node update-products-fa.js --apply");
    return;
  }

  console.log("\n3. Updating products...");

  for (let i = 0; i < dbProducts.length; i++) {
    const db = dbProducts[i];
    const fa = persianProducts[i];

    const { data, error } = await supabase
      .from("products")
      .update({
        title: fa.title,
        description: fa.description,
        tags: fa.tags,
      })
      .eq("dummyjson_id", db.dummyjson_id)
      .select("dummyjson_id");

    if (error) throw error;

    if (!data || data.length !== 1) {
      throw new Error(`Failed to update product ID ${db.dummyjson_id}.`);
    }

    console.log(`Updated ${i + 1}/${dbProducts.length}`);
  }

  console.log("\n4. Updating category names...");

  for (const [id, name] of categoryMap) {
    const { data, error } = await supabase
      .from("categories")
      .update({ name })
      .eq("id", id)
      .select("id");

    if (error) throw error;

    if (!data || data.length !== 1) {
      throw new Error(`Failed to update category ID ${id}.`);
    }

    console.log(`Updated category: ${name}`);
  }

  console.log("\nPersian update completed!");
  console.log("Other product fields were not modified.");
}

updateProducts().catch((error) => {
  console.error("\nUPDATE FAILED:", error.message);
  process.exitCode = 1;
});
