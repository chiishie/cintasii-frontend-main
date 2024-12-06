import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core/index.js";

export default function Calendar({
  events,
  onDateClick,
  onEventClick,
}: {
  events: { title: string; date: string; publicId: number }[];
  onDateClick: (clickedDate: string) => void;
  onEventClick: (eventId: number) => void;
}) {
  const handleDateClick = (arg: DateClickArg) => {
    onDateClick(arg.dateStr);
  };

  const handleEventClick = (arg: EventClickArg) => {
    onEventClick(arg.event._def.extendedProps.publicId);
  };

  return (
    <FullCalendar
      events={events}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={handleDateClick}
      eventClick={handleEventClick}
      editable={true}
    />
  );
}
