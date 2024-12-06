import { useQuery } from "@tanstack/react-query";

import apiClient from "@/lib/apiClient";
import { Schedule } from "../../../interfaces/models/schedule";

const useEvents = () => {
  return useQuery<Schedule[]>({
    queryKey: ["schedules"],
    queryFn: async () => {
      const res = await apiClient.get("/api/schedules");
      return res.data;
    },
  });
};

export default useEvents;
