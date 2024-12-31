import {
  useImperativeHandle,
  useState,
  forwardRef,
  Ref,
  useEffect,
} from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TimePicker } from "@/components/ui/time-picker";
import { Button } from "@/components/ui/button";
import AppDialog from "@/components/app-dialog";
import { CreateScheduleHandleRef } from "../interfaces/createschedule-handle-ref";
import { Controller, useForm } from "react-hook-form";
import useManageSchedule from "./hooks/use-manage-schedule";
import { toast } from "sonner";
import useSchedule from "./hooks/use-schedule";
import { ScheduleFormInputs } from "../interfaces/forms/schedule-form-inputs";
import useTimeFormatting from "@/common/hooks/use-time-formatting";

const ScheduleManager = forwardRef(
  (_props, ref: Ref<CreateScheduleHandleRef>) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [selectScheduleId, setSelectedScheduleId] = useState<
      number | undefined
    >(undefined);

    const [isUpdate, setIsUpdate] = useState(false);

    const { control, register, handleSubmit, reset } =
      useForm<ScheduleFormInputs>();

    const { timeStringToDate } = useTimeFormatting();

    const {
      createSchedule,
      isSuccess,
      error,
      updateAsync,
      isScheduleUpdateSuccess,
      scheduleUpdateError,
      deleteAsync,
      isScheduleDeleteSuccess,
      scheduleDeleteError,
    } = useManageSchedule();

    const { schedule } = useSchedule(selectScheduleId);

    const handleEventClick = (eventId: number) => {
      setSelectedScheduleId(eventId);
      setIsDialogOpen(true);
      setIsUpdate(true);
    };

    const handleDateClick = (date: Date) => {
      setSelectedDate(date);
      setIsDialogOpen(true);
      setIsUpdate(false);
    };

    const handleDeleteClick = async () => {
      if (selectScheduleId) {
        const scheduleId = selectScheduleId;
        setSelectedScheduleId(undefined);
        await deleteAsync(scheduleId);
      }
    };

    useEffect(() => {
      if (schedule) {
        reset({
          name: schedule?.name,
          fromTime: timeStringToDate(schedule?.end_time),
          toTime: timeStringToDate(schedule?.start_time),
        });
        setSelectedDate(new Date(schedule?.date));
      }
    }, [schedule, reset, timeStringToDate]);

    const onSubmit = async (data: ScheduleFormInputs) => {
      if (selectedDate) {
        const payload = {
          name: data.name,
          fromTime: data.fromTime.toLocaleTimeString("en-US", {
            hour12: false,
          }),
          toTime: data.toTime.toLocaleTimeString("en-US", { hour12: false }),
          date: selectedDate?.toISOString().split("T")[0],
        };

        if (selectedDate && !isUpdate) {
          await createSchedule(payload);
        } else if (isUpdate && selectScheduleId && selectedDate) {
          await updateAsync({ ...payload, id: selectScheduleId });
        }
      }

      reset();
    };

    useImperativeHandle(ref, () => ({
      handleEventClick,
      handleDateClick,
    }));

    useEffect(() => {
      if (isSuccess) {
        toast("Schedule has been created successfully");
        setIsDialogOpen(false);
      } else if (error) {
        toast("Schedule creation failed");
      }
    }, [isSuccess, error]);

    useEffect(() => {
      if (isScheduleUpdateSuccess) {
        toast("Schedule has been updated successfully");
        setIsDialogOpen(false);
      } else if (scheduleUpdateError) {
        toast.error("Schedule update failed");
      }
    }, [isScheduleUpdateSuccess, scheduleUpdateError]);

    useEffect(() => {
      if (isScheduleDeleteSuccess) {
        toast("Schedule has been deleted successfully");
        setIsDialogOpen(false);
      } else if (scheduleDeleteError) {
        toast.error("Schedule delete failed");
      }
    }, [isScheduleDeleteSuccess, scheduleDeleteError]);

    return (
      <AppDialog
        title="Dialog Title"
        description="Dialog Description"
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
          </div>
          <div className="my-4">
            <Label htmlFor="fromTime">From Time</Label>
            <Controller
              name="fromTime"
              control={control}
              render={({ field }) => (
                <TimePicker date={field.value} setDate={field.onChange} />
              )}
            />
          </div>
          <div className="my-4">
            <Label htmlFor="toTime">To Time</Label>
            <Controller
              name="toTime"
              control={control}
              render={({ field }) => (
                <TimePicker date={field.value} setDate={field.onChange} />
              )}
            />
          </div>
          <div className="w-full">
            <Button className="w-full" type="submit">
              {isUpdate ? "Update Schedule" : "Create Schedule"}
            </Button>
          </div>
        </form>

        <Button
          onClick={handleDeleteClick}
          className="w-full"
          variant="outline"
          type="submit"
        >
          Delete Schedule
        </Button>
      </AppDialog>
    );
  }
);

export default ScheduleManager;
