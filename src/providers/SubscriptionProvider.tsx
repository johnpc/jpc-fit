import { useEffect, ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { client } from "../lib/amplify-client";
import { useAuth } from "../hooks/useAuth";

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const subscriptions = [
      client.models.Food.onCreate().subscribe({
        next: () => queryClient.invalidateQueries({ queryKey: ["food"] }),
      }),
      client.models.Food.onUpdate().subscribe({
        next: () => queryClient.invalidateQueries({ queryKey: ["food"] }),
      }),
      client.models.Food.onDelete().subscribe({
        next: () => queryClient.invalidateQueries({ queryKey: ["food"] }),
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
        next: () =>
          queryClient.invalidateQueries({ queryKey: ["healthKitCache"] }),
      }),
      client.models.HealthKitCache.onUpdate().subscribe({
        next: () =>
          queryClient.invalidateQueries({ queryKey: ["healthKitCache"] }),
      }),
      client.models.HealthKitCache.onDelete().subscribe({
        next: () =>
          queryClient.invalidateQueries({ queryKey: ["healthKitCache"] }),
      }),
    ];

    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
  }, [user, queryClient]);

  return <>{children}</>;
}
