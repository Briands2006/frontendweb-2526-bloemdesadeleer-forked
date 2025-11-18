import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import useSWR from "swr";
import { getAll } from "../api/index.js";
import AsyncData from "../components/AsyncData.jsx";
import { FullCalendarEvent, Race } from "../types/calendarTypes.js";

const slugToTitle = (slug) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const Calendar = () => {
  return (
    <main className="p-8 text-white">
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
    </main>
  );
};

export default Calendar;
