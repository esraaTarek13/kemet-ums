"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import TodayAgenda from "@/components/ui/schedule/TodayAgenda";
import CardSkeleton from "@/components/ui/skeletons/CardSkeleton";
import { useSchedule } from "@/hooks/faculty/useSchedule";
import { getTodayEvents } from "@/utils/shared/todayEvents";
import { format } from "date-fns";
import { useMemo } from "react";

export default function FacultyTodayAgenda() {
  const { data: events, isPending, isError } = useSchedule();

  const todayEvents = useMemo(() => getTodayEvents(events ?? []), [events]);

  const { today, now } = useMemo(
    () => ({
      today: format(new Date(), "EEEE, MMMM d"),
      now: format(new Date(), "HH:mm"),
    }),
    [],
  );

  if (isPending)
    return (
      <div className="lg:w-90">
        <CardSkeleton />
      </div>
    );
  if (isError)
    return <ErrorMessage content="Failed to load today's schedule." />;

  return <TodayAgenda date={today} now={now} events={todayEvents} />;
}
