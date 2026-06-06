"use client";
import sharedStyles from "../shared/schedule.module.css";
import styles from "./ScheduleCalendar.module.css";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useScheduleEvents } from "@/hooks/student/useScheduleEvents";
import ScheduleSkeleton from "@/components/ui/skeletons/ScheduleSkeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";

// SSR disabled to avoid hydration mismatch with calendar DOM
const IlamyCalendar = dynamic(
  () => import("@ilamy/calendar").then((mod) => mod.IlamyCalendar),
  { ssr: false, loading: () => <ScheduleSkeleton /> },
);

export default function ScheduleCalendar() {
  const { events, isPending, isError } = useScheduleEvents();

  if (isPending) return <ScheduleSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load Schedule." />;

  return (
    <section
      className="min-w-full overflow-hidden space-y-5 lg:space-y-6"
      aria-label="This week's schedule"
    >
      <h3 className="title">My Schedule</h3>

      <div className={sharedStyles.calendar}>
        <div className={styles.calendar}>
          <IlamyCalendar
            events={events}
            initialView="week"
            firstDayOfWeek="saturday"
            hideNonBusinessHours={true}
            businessHours={{ startTime: 6, endTime: 19 }}
            disableCellClick={true}
            disableEventClick={true}
            disableDragAndDrop={true}
            stickyViewHeader={true}
            viewHeaderClassName="pointer-events-none sticky top-0 z-40 shadow-sm h-fit bg-bg-filter text-text-muted font-semibold uppercase"
            eventHeight={80}
            eventSpacing={2}
            // today's event gets distinct border and background
            renderEvent={(event) => {
              const isActive =
                event.start.format("YYYY-MM-DD") ===
                dayjs().format("YYYY-MM-DD");
              return (
                <div
                  aria-label={`${event.title} — ${event.description}, at ${event.start.format("H:mm")}`}
                  className={`h-full w-full p-2 border-b-0 border-l-4 text-text-primary rounded-lg overflow-clip
                    ${isActive ? "bg-[#e3dfd9] border-text-secondary" : "bg-[#ece8e9] border-primary"}`}
                >
                  <p className="text-xs font-semibold truncate">
                    {event.title}
                  </p>
                  <p className="text-[10px] opacity-80 text-wrap">
                    {event.description}
                  </p>
                </div>
              );
            }}
            // time column label e.g. "9:00 AM"
            renderHour={(date) => (
              <span className="text-xs text-muted-foreground">
                {date.format("H:00 A")}
              </span>
            )}
          />
        </div>
      </div>
    </section>
  );
}
