import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/features/auth/context/AuthProvider";
import { useRecentlyViewedStore } from "@/features/history/store/recentlyViewedStore";
import { supabase } from "@/lib/supabase";

const MAX_HISTORY_ITEMS = 10;
const PAGE_SIZE = 1000;

export function useTrackRecentlyViewed(
  productId: number | null | undefined
) {
  const { session } = useAuth();

  const queryClient = useQueryClient();

  const addLocalProduct = useRecentlyViewedStore(
    (state) => state.addProduct
  );

  const userId =
    session.mode === "authenticated"
      ? session.user.id
      : null;

  useEffect(() => {
    if (
      !productId ||
      !Number.isInteger(productId) ||
      productId <= 0
    ) {
      return;
    }

    // Guest and demo customers use Zustand.
    if (session.mode !== "authenticated") {
      addLocalProduct(productId);
      return;
    }

    if (!userId) return;

    let cancelled = false;

    async function trackProduct() {
      try {
        // 1. Insert or update the product visit.
        const { error } = await supabase
          .from("recently_viewed")
          .upsert(
            {
              user_id: userId,
              product_id: productId,
              viewed_at: new Date().toISOString(),
            },
            {
              onConflict: "user_id,product_id",
            }
          );

        if (error) throw error;

        if (cancelled) return;

        // 2. Find history records beyond the latest 10.
        let offset = MAX_HISTORY_ITEMS;

        const oldIds: number[] = [];

        while (!cancelled) {
          const { data, error: historyError } = await supabase
            .from("recently_viewed")
            .select("id")
            .eq("user_id", userId)
            .order("viewed_at", { ascending: false })
            .order("id", { ascending: false })
            .range(offset, offset + PAGE_SIZE - 1);

          if (historyError) throw historyError;

          if (!data?.length) break;

          oldIds.push(...data.map((item) => item.id));

          if (data.length < PAGE_SIZE) break;

          offset += PAGE_SIZE;
        }

        if (cancelled) return;

        // 3. Delete old records in batches.
        for (let i = 0; i < oldIds.length; i += PAGE_SIZE) {
          const batch = oldIds.slice(i, i + PAGE_SIZE);

          const { error: deleteError } = await supabase
            .from("recently_viewed")
            .delete()
            .eq("user_id", userId)
            .in("id", batch);

          if (deleteError) throw deleteError;

          if (cancelled) return;
        }
      } catch (error) {
        console.error("Recently viewed error:", error);
      } finally {
        // 4. Refresh profile history queries.
        if (!cancelled) {
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: ["profile-recently-viewed", userId],
            }),

            queryClient.invalidateQueries({
              queryKey: ["profile-history-products", userId],
            }),
          ]);
        }
      }
    }

    void trackProduct();

    return () => {
      cancelled = true;
    };
  }, [
    productId,
    session.mode,
    userId,
    addLocalProduct,
    queryClient,
  ]);
}