"use client";

import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import TodayAgenda from "@/components/ui/schedule/TodayAgenda";
import CardSkeleton from "@/components/ui/skeletons/CardSkeleton";
import { useTodayAgenda } from "@/hooks/student/schedule/useTodayAgenda";

export default function StudentTodayAgenda() {
  const { isPending, isError, today, now, todayEvents } = useTodayAgenda();

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
