import { FacultyScheduleEvent, StudentSchedule } from "@/types";
import AgendaEventCard from "./AgendaEventCard";

interface TodayAgendaProps {
  title?: string;
  date: string;
  now: string;
  events: StudentSchedule[] | FacultyScheduleEvent[];
}

export default function TodayAgenda({
  title = "Today's Agenda",
  date,
  now,
  events,
}: TodayAgendaProps) {
  return (
    <section className="lg:pl-6 relative w-full lg:min-w-70 lg:w-fit">
      {/* Decorative stripe — lg screens only */}
      <div
        className="bg-bg-navbar border-l border-bg-bar absolute -top-6 -bottom-6 left-0 -right-3.75 hidden lg:block -z-10"
        aria-hidden="true"
      />

      <div className="pb-5 border-b-2 border-text-peach">
        <h3 className="title">{title}</h3>
        <p className="text-[10px] md:text-xs text-text-secondary uppercase mt-1">
          {date}
        </p>
      </div>

      <ul aria-label={title} className="space-y-4 mt-5 w-full">
        {events.length === 0 ? (
          <li className="text-text-muted text-center py-10">
            No events scheduled for today.
          </li>
        ) : (
          events.map((event) => (
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
