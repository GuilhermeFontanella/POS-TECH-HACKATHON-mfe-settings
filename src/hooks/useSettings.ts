import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../service/settings.service";

export function useSettings() {
    return useQuery({
        queryKey: ['settings'],
        queryFn: () => getSettings()
    });
}