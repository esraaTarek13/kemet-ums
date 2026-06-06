"use client";
import ErrorMessage from "@/components/ui/ErrorMessage";
import CardSkeleton from "@/components/ui/skeletons/CardSkeleton";
import { useSchedule } from "@/hooks/student/useSchedule";
import { getTodayEvents } from "@/utils/scheduleUtils";
import { format } from "date-fns";
import { useMemo } from "react";
import AgendaEventCard from "./AgendaEventCard";

export default function TodayAgenda() {
  const { data: events, isPending, isError } = useSchedule();

  // Filter events to today's date only
  const todayEvents = useMemo(() => getTodayEvents(events ?? []), [events]);

  // Computed once on mount — not real-time
  const { today, now } = useMemo(
    () => ({
      today: format(new Date(), "EEEE, MMMM d"),
      now: format(new Date(), "HH:mm"),
    }),
    [],
  );

  if (isPending) return <CardSkeleton />;
  if (isError)
    return <ErrorMessage content="Failed to load today's schedule." />;

  return (
    <section className="lg:pl-6 relative">
      {/* Decorative stripe — lg screens only */}
      <div
        className="bg-bg-navbar border-l border-bg-bar absolute -top-6 -bottom-6 left-0 -right-3.75 hidden lg:block -z-10"
        aria-hidden="true"
      />

      <div className="pb-5 border-b-2 border-text-peach">
        <h3 className="title">Today's Agenda</h3>
        <p className="text-[10px] md:text-xs text-text-secondary uppercase mt-1">
          {today}
        </p>
      </div>

      <ul
        aria-label="Today's schedule"
        className="space-y-4 mt-5 w-full lg:w-fit"
      >
        {todayEvents.length === 0 ? (
          <li className="text-text-muted text-center py-10">
            No events scheduled for today.
          </li>
        ) : (
          todayEvents.map((event) => (
            <AgendaEventCard
              key={`${event.course_code}-${event.start_time}`}
              event={event}
              now={now}
            />
          ))
        )}
      </ul>
    </section>
  );
}
