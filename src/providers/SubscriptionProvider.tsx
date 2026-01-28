import { useEffect, ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { client } from "../lib/amplify-client";
import { useAuth } from "../hooks/useAuth";
import { FoodEntity, HealthKitCacheEntity } from "../lib/types";

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const subscriptions = [
      client.models.Food.onCreate().subscribe({
        next: (data) => {
          const food = data as FoodEntity;
          queryClient.invalidateQueries({ queryKey: ["food", food.day] });
        },
      }),
      client.models.Food.onUpdate().subscribe({
        next: (data) => {
          const food = data as FoodEntity;
          queryClient.invalidateQueries({ queryKey: ["food", food.day] });
        },
      }),
      client.models.Food.onDelete().subscribe({
        next: (data) => {
          const food = data as FoodEntity;
          queryClient.invalidateQueries({ queryKey: ["food", food.day] });
        },
      }),
      client.models.Goal.onCreate().subscribe({
        next: () => queryClient.invalidateQueries({ queryKey: ["goal"] }),
      }),
      client.models.Goal.onUpdate().subscribe({
        next: () => queryClient.invalidateQueries({ queryKey: ["goal"] }),
      }),
      client.models.Weight.onCreate().subscribe({
        next: () => queryClient.invalidateQueries({ queryKey: ["weight"] }),
      }),
      client.models.Weight.onDelete().subscribe({
        next: () => queryClient.invalidateQueries({ queryKey: ["weight"] }),
      }),
      client.models.Height.onCreate().subscribe({
        next: () => queryClient.invalidateQueries({ queryKey: ["height"] }),
      }),
      client.models.QuickAdd.onCreate().subscribe({
        next: () => queryClient.invalidateQueries({ queryKey: ["quickAdd"] }),
      }),
      client.models.QuickAdd.onUpdate().subscribe({
        next: () => queryClient.invalidateQueries({ queryKey: ["quickAdd"] }),
      }),
      client.models.QuickAdd.onDelete().subscribe({
        next: () => queryClient.invalidateQueries({ queryKey: ["quickAdd"] }),
      }),
      client.models.Preferences.onCreate().subscribe({
        next: () =>
          queryClient.invalidateQueries({ queryKey: ["preferences"] }),
      }),
      client.models.Preferences.onUpdate().subscribe({
        next: () =>
          queryClient.invalidateQueries({ queryKey: ["preferences"] }),
      }),
      client.models.HealthKitCache.onCreate().subscribe({
        next: (data) => {
          const cache = data as HealthKitCacheEntity;
          queryClient.invalidateQueries({ queryKey: ["healthKitCache", cache.day] });
        },
      }),
      client.models.HealthKitCache.onUpdate().subscribe({
        next: (data) => {
          const cache = data as HealthKitCacheEntity;
          queryClient.invalidateQueries({ queryKey: ["healthKitCache", cache.day] });
        },
      }),
      client.models.HealthKitCache.onDelete().subscribe({
        next: (data) => {
          const cache = data as HealthKitCacheEntity;
          queryClient.invalidateQueries({ queryKey: ["healthKitCache", cache.day] });
        },
      }),
    ];

    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
  }, [user, queryClient]);

  return <>{children}</>;
}
