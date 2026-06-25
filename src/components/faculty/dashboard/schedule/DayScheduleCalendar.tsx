import sharedStyles from "@/styles/schedule.module.css";
import styles from "./daySchedule.module.css";
import WeeklyScheduleSkeleton from "@/components/ui/skeletons/WeeklyScheduleSkeleton";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { CalendarEvent } from "@ilamy/calendar";

// SSR disabled to avoid hydration mismatch with calendar DOM
const IlamyCalendar = dynamic(
  () => import("@ilamy/calendar").then((mod) => mod.IlamyCalendar),
  { ssr: false, loading: () => <WeeklyScheduleSkeleton /> },
);

interface WeeklyScheduleCardProps {
  events: CalendarEvent[];
}

export default function DayScheduleCalendar({
  events,
}: WeeklyScheduleCardProps) {
  return (
    <section
      aria-label="Daily schedule"
      className="min-w-full overflow-hidden space-y-5"
    >
      <div className="flex justify-between items-center gap-3 flex-wrap">
        <h3 className="title">This Day</h3>
        <Link
          href="/faculty/schedule"
          aria-label="Full Calendar View"
          className="group flex gap-2 items-center text-text-secondary transition duration-200 px-2"
        >
          <span className="text-xs md:text-sm">Full Calendar View</span>
          <FaArrowRight
            aria-hidden="true"
            className="text-xs shrink-0 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className={sharedStyles.calendar}>
        <div className={styles.calendar}>
          <IlamyCalendar
            events={events}
            initialView="day"
            firstDayOfWeek="saturday"
            hideNonBusinessHours={true}
            businessHours={{ startTime: 8, endTime: 20 }}
            disableCellClick={true}
            disableEventClick={true}
            disableDragAndDrop={true}
            stickyViewHeader={true}
            headerClassName="hidden"
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
                  aria-label={`${event.title}, ${event.description}, starts at ${event.start.format("H:mm A")}`}
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
