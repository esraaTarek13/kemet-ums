import { AGENDA_STATUS_STYLES } from "@/data/shared/agendaStatusStyles";
import { FacultyScheduleEvent, StudentSchedule } from "@/types";
import { CiLocationOn } from "react-icons/ci";

/** Maps a time range to a display status based on current time. */
const getStatus = (start: string, end: string, now: string) => {
  if (now >= start && now <= end) return "ACTIVE NOW";
  if (now >= start && now <= end) return "ACTIVE NOW";
  if (now < start) return "UPCOMING";
  return "DONE";
};

interface AgendaEventCardProps {
  event: StudentSchedule | FacultyScheduleEvent;
  now: string;
}

export default function AgendaEventCard({ event, now }: AgendaEventCardProps) {
  /** Slice to "HH:mm" — times stored as "HH:mm:ss" from the API. */
  const start = event.start_time.slice(0, 5);
  const end = event.end_time.slice(0, 5);
  const status = getStatus(start, end, now);

  return (
    <li className="bg-bg-card border-l-4 border-accent p-4 md:p-5 rounded-lg space-y-2">
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <span
          role="status"
          className={`text-[10px] md:text-sm rounded-full py-1 px-3 ${AGENDA_STATUS_STYLES[status]}`}
        >
          {status}
        </span>
        <p
          aria-label={`from ${start} to ${end}`}
          className="text-text-muted text-xs"
        >
          {start} – {end}
        </p>
      </div>

      <h4 className="font-semibold text-sm md:text-base text-text-primary">
        {event.course_code}: {event.course_name}
      </h4>

      <p className="flex items-center gap-2 text-text-muted/70">
        <CiLocationOn aria-hidden="true" />
        <span className="text-xs md:text-sm">{event.room}</span>
      </p>
    </li>
  );
}
