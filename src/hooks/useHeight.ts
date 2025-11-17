import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../lib/amplify-client";
import { HeightEntity } from "../lib/types";
import { useAuth } from "./useAuth";

export function useHeight() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["height"],
    queryFn: async () => {
      const { data } = await client.models.Height.list({ limit: 5000 });
      return (data as HeightEntity[]).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    enabled: !!user,
  });
}

export function useCreateHeight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (height: { currentHeight: number }) => {
      const { data } = await client.models.Height.create(height);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["height"] });
    },
  });
}

export function useUpdateHeight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (height: Partial<HeightEntity> & { id: string }) => {
      const { data } = await client.models.Height.update(height);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["height"] });
    },
  });
}
