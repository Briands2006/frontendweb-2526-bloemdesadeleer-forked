import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import useSWR from "swr";
import { getAll } from "../api/index.js";
import AsyncData from "../components/AsyncData.jsx";

const slugToTitle = (slug) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const Calendar = () => {
  const [calendarEvent, setCalendarEvent] = useState([]);
  const { data: races = [], isLoading, error } = useSWR("races", getAll);

  useEffect(() => {
    if (Array.isArray(races) && races.length > 0) {
      const formattedEvents = races.map((race) => ({
        id: race.id,
        title: slugToTitle(race.slug),
        start: race.date,
        url: `/races/${race.slug}`,
      }));

      setCalendarEvent(formattedEvents);
    } else if (races.length === 0) {
      setCalendarEvent([]);
    }
  }, [races]);

  return (
    <main className="p-8 text-white">
      <AsyncData loading={isLoading} error={error}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={calendarEvent}
          headerToolbar={{
            left: "prev, next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
        />
      </AsyncData>
    </main>
  );
};

export default Calendar;
