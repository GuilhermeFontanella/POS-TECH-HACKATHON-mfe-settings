import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "../service/settings.service";

export function useUpdatePreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateSettings(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
  });
}