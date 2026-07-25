"use client";

import WeeklyScheduleSkeleton from "@/components/ui/skeletons/WeeklyScheduleSkeleton";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import { mapToScheduleEvents } from "@/lib/mappers/shared/scheduleEventsMapper";
import { useFacultySchedule } from "@/hooks/faculty/schedule/useSchedule";
import DayScheduleCalendar from "./DayScheduleCalendar";

export default function DayScheduleCard() {
  const { data: schedule, isPending, isError } = useFacultySchedule();
  
  if (isPending) return <WeeklyScheduleSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load Schedule data." />;
  
  const events = mapToScheduleEvents(schedule);  
  
  return <DayScheduleCalendar events={events} />;
}
