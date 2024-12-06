import { useQuery } from "@tanstack/react-query";

import apiClient from "@/lib/apiClient";
import { Schedule } from "../../interfaces/models/schedule";

const useSchedule = (scheduleId: number | undefined) => {
  const { data, error } = useQuery<Schedule>({
    queryKey: ["schedules", { scheduleId }],
    queryFn: async () => {
      const res = await apiClient.get(`/api/schedules/${scheduleId}`);
      return res.data;
    },
    enabled: scheduleId !== undefined,
  });

  return { schedule: data, error };
};

export default useSchedule;
