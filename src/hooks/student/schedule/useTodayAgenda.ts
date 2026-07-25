import { useMemo } from "react";
import { format } from "date-fns";
import { getTodayEvents } from "@/lib/utils/shared/getTodayEvents";
import { useStudentSchedule } from "./queries/useSchedule";

export function useTodayAgenda() {
  const { data: events, isPending, isError } = useStudentSchedule();

  const todayEvents = useMemo(() => getTodayEvents(events ?? []), [events]);

  const { today, now } = useMemo(
    () => ({
      today: format(new Date(), "EEEE, MMMM d"),
      now: format(new Date(), "HH:mm"),
    }),
    [],
  );

  return {
    isPending,
    isError,
    today,
    now,
    todayEvents,
  };
}
