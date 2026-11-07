import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/features/auth/context/AuthProvider";
import { useFavoritesStore } from "@/features/favorites/store/favoritesStore";
import { supabase } from "@/lib/supabase";

export function useProductFavorite(productId: number) {
  const { session } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const isDemo = session.mode === "demo";
  const isAuthenticated = session.mode === "authenticated";

  const userId = isAuthenticated ? session.user.id : null;

  const demoFavoriteIds = useFavoritesStore(
    (state) => state.productIds
  );

  const toggleDemoFavorite = useFavoritesStore(
    (state) => state.toggleFavorite
  );

  // Fetch favorites belonging to the authenticated customer.
  const favoriteQuery = useQuery<number[]>({
    queryKey: ["favorites", userId],
    enabled: userId !== null,

    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from("favorites")
        .select("product_id")
        .eq("user_id", userId);

      if (error) throw error;

      return (data ?? []).map((item) => Number(item.product_id));
    },
  });

  // Add or remove a favorite in Supabase.
  const favoriteMutation = useMutation({
    mutationFn: async (currentlyFavorite: boolean) => {
      if (!userId) {
        throw new Error("User is not authenticated");
      }

      if (currentlyFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", userId)
          .eq("product_id", productId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({
            user_id: userId,
            product_id: productId,
          });

        if (error) throw error;
      }
    },

   onSuccess: async () => {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: ["favorites", userId],
    }),

    queryClient.invalidateQueries({
      queryKey: ["profile-favorites", userId],
    }),
  ]);
},
  });

  const isFavorite = isDemo
    ? demoFavoriteIds.includes(productId)
    : isAuthenticated
      ? (favoriteQuery.data ?? []).includes(productId)
      : false;

  function toggleFavorite() {
    if (!Number.isInteger(productId) || productId <= 0) return;

    if (session.mode === "guest") {
      navigate("/auth/login", {
        state: {
          from: `${location.pathname}${location.search}`,
        },
      });

      return;
    }

    if (session.mode === "demo") {
      toggleDemoFavorite(productId);
      return;
    }

    if (!favoriteMutation.isPending) {
      favoriteMutation.mutate(isFavorite);
    }
  }

  return {
    isFavorite,
    toggleFavorite,
    isLoading:
      favoriteQuery.isFetching || favoriteMutation.isPending,
    error: favoriteQuery.error ?? favoriteMutation.error,
  };
}