import FullCalendar from "@fullcalendar/react";
import dayGrid from "@fullcalendar/daygrid";

export const Calendar = () => {
  return (
    <main className="p-8 text-white">
      <FullCalendar plugins={[dayGrid]} initialView="dayGridMonth" />
    </main>
  );
};

export default Calendar;
