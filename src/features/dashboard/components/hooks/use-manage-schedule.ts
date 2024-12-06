import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { SchedulePayload } from "@/features/dashboard/interfaces/payloads/schdule-payload";
import { UpdateSchedulePayload } from "../../interfaces/payloads/update-shedule-payload";

const useManageSchedule = () => {
  const queryClient = useQueryClient();

  const { error, isSuccess, mutateAsync } = useMutation({
    mutationFn: async (data: SchedulePayload) =>
      await apiClient.post("/api/schedules", {
        name: data.name,
        date: data.date,
        start_time: data.fromTime,
        end_time: data.toTime,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });

  const {
    error: scheduleUpdateError,
    isSuccess: isScheduleUpdateSuccess,
    mutateAsync: updateAsync,
  } = useMutation({
    mutationFn: async (data: UpdateSchedulePayload) =>
      await apiClient.put(`/api/schedules/${data.id}`, {
        id: data.id,
        name: data.name,
        date: data.date,
        start_time: data.fromTime,
        end_time: data.toTime,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });

  const {
    error: scheduleDeleteError,
    isSuccess: isScheduleDeleteSuccess,
    mutateAsync: deleteAsync,
  } = useMutation({
    mutationFn: async (scheduleId: number) =>
      await apiClient.delete(`/api/schedules/${scheduleId}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });

  return {
    createSchedule: mutateAsync,
    error,
    isSuccess,
    updateAsync,
    scheduleUpdateError,
    isScheduleUpdateSuccess,
    deleteAsync,
    scheduleDeleteError,
    isScheduleDeleteSuccess,
  };
};

export default useManageSchedule;
