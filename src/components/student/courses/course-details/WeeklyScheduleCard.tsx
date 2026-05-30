"use client";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { useStudentCourseDetails } from "@/hooks/student/useStudentCourseDetails";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU"];
export default function WeeklyScheduleCard({ courseId }: { courseId: string }) {
  const { data, isError, isPending } = useStudentCourseDetails(courseId);
  const course = data?.course;  

  if (isError) return <ErrorMessage content="Failed to load Schedule data." />;

  const weeklySchedule = DAYS.map((day) => ({
    day,
    session: course?.days?.includes(day)
      ? {
          time: `${course.start_time.slice(0, 5)} – ${course.end_time.slice(0, 5)}`,
          room: course.room,
        }
      : null,
  }));

  return (
    <section className="card-top-border space-y-5 md:space-y-6">
      <h3 className="header-title">Weekly Schedule</h3>
      {weeklySchedule.map(({ day, session }) => (
        <div key={day} className="flex items-center gap-4 md:gap-4">
          <p
            className={`w-10 font-extrabold uppercase text-[11px] ${session ? "text-accent" : "text-text-subtle"}`}
          >
            {day}
          </p>
          {session ? (
            <div className="bg-accent rounded-sm py-3 px-4 grow">
              <p className="font-bold text-xs md:text-sm text-text-white">
                {session.time}
              </p>
              <p className="text-[10px] md:text-xs uppercase text-text-white/70 mt-1">
                {session.room}
              </p>
            </div>
          ) : (
            <div className="bg-bg-navbar rounded-sm py-3 px-4 grow">
              <p className="text-xs text-text-subtle">No sessions scheduled</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
