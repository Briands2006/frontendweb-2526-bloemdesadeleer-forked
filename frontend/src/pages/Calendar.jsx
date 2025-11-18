import React from "react";
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
  const { data: races = [], isLoading, error } = useSWR("races", getAll);

  const events = Array.isArray(races)
    ? races.map((race) => ({
    // mapping race => FullCalendar format
      id: race.id,
      title: slugToTitle(race.slug),
      start: race.date,
      url: `/races/${race.slug}`,
    }))
    : [];

  return (
    <main className="p-8 text-white">
      <AsyncData loading={isLoading} error={error}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
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
