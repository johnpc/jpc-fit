import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../lib/amplify-client";
import { QuickAddEntity } from "../lib/types";

export function useQuickAdd() {
  return useQuery({
    queryKey: ["quickAdd"],
    queryFn: async () => {
      const { data } = await client.models.QuickAdd.list({ limit: 5000 });
      return data as QuickAddEntity[];
    },
  });
}

export function useCreateQuickAdd() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (quickAdd: { name: string; calories: number; protein?: number; icon: string }) => {
      const { data } = await client.models.QuickAdd.create(quickAdd);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quickAdd"] });
    },
  });
}

export function useUpdateQuickAdd() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (quickAdd: Partial<QuickAddEntity> & { id: string }) => {
      const { data } = await client.models.QuickAdd.update(quickAdd);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quickAdd"] });
    },
  });
}

export function useDeleteQuickAdd() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await client.models.QuickAdd.delete({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quickAdd"] });
    },
  });
}
