import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../lib/amplify-client";
import { PreferencesEntity } from "../lib/types";

export function usePreferences() {
  return useQuery({
    queryKey: ["preferences"],
    queryFn: async () => {
      const { data } = await client.models.Preferences.list({ limit: 5000 });
      return data[0] as PreferencesEntity | undefined;
    },
  });
}

export function useUpdatePreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (preferences: Partial<PreferencesEntity>) => {
      const existing = queryClient.getQueryData<PreferencesEntity>([
        "preferences",
      ]);

      if (existing?.id) {
        const { data } = await client.models.Preferences.update({
          id: existing.id,
          ...preferences,
        });
        return data;
      } else {
        const { data } = await client.models.Preferences.create(preferences);
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["preferences"] });
    },
  });
}
