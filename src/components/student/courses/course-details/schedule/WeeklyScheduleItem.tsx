interface WeeklyScheduleItemProps {
  day: string;
  session: { time: string; room: string } | null;
}

export default function WeeklyScheduleItem({
  day,
  session,
}: WeeklyScheduleItemProps) {
  return (
    <li
      aria-label={
        session
          ? `${day}: ${session.time}, ${session.room}`
          : `${day}: no session`
      }
      className="flex items-center gap-4"
    >
      <p
        aria-hidden="true"
        className={`w-10 font-extrabold uppercase text-[11px] ${
          session ? "text-accent" : "text-text-subtle"
        }`}
      >
        {day}
      </p>

      {session ? (
        <div aria-hidden="true" className="bg-accent rounded-sm py-3 px-4 grow">
          <p className="font-bold text-xs md:text-sm text-text-white">
            {session.time}
          </p>
          <p className="text-[10px] md:text-xs uppercase text-text-white/70 mt-1">
            {session.room}
          </p>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="bg-bg-navbar rounded-sm py-3 px-4 grow"
        >
          <p className="text-xs text-text-subtle">No sessions scheduled</p>
        </div>
      )}
    </li>
  );
}
