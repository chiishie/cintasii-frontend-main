import { useRef } from "react";
import Calendar from "@/components/calendar";
import DashboardLayout from "@/layout/dashboard-layout";
import useEvents from "./hooks/useEvents";
import CreateSchedule from "../../components/schedule-manager";
import { CreateScheduleHandleRef } from "../../interfaces/createschedule-handle-ref";

const Dashboard = () => {
  const { data } = useEvents();
  const createScheduleRef = useRef<CreateScheduleHandleRef>(null);

  return (
    <DashboardLayout title="Schedules" subTitle="Calendar">
      <CreateSchedule ref={createScheduleRef} />
      <Calendar
        events={
          data?.map((d) => {
            return {
              title: d.name,
              date: d.date,
              publicId: d.id,
            };
          }) || []
        }
        onDateClick={(date) => {
          createScheduleRef.current?.handleDateClick(new Date(date));
        }}
        onEventClick={(eventId) => {
          createScheduleRef.current?.handleEventClick(eventId);
        }}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
