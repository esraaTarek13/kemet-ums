"use client";
import ErrorMessage from "@/components/ui/ErrorMessage";
import WeeklyScheduleSkeleton from "@/components/ui/skeletons/WeeklyScheduleSkeleton";
import { useStudentCourseDetails } from "@/hooks/student/useStudentCourseDetails";
import { useMemo } from "react";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU"];

export default function WeeklyScheduleCard({ courseId }: { courseId: string }) {
  const { data, isError, isPending } = useStudentCourseDetails(courseId);
  const course = data?.course;

  // null if course doesn't meet that day
  const weeklySchedule = useMemo(
    () =>
      DAYS.map((day) => ({
        day,
        session: course?.days?.includes(day)
          ? {
              time: `${course.start_time.slice(0, 5)} – ${course.end_time.slice(0, 5)}`,
              room: course.room,
            }
          : null,
      })),
    [course?.days, course?.start_time, course?.end_time],
  );

  if (isPending) return <WeeklyScheduleSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load Schedule data." />;

  return (
    <section
      aria-label="Weekly schedule"
      className="card-top-border space-y-5 md:space-y-6"
    >
      <h3 className="title">Weekly Schedule</h3>

      <ul className="space-y-3">
        {weeklySchedule.map(({ day, session }) => (
          <li
            key={day}
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
              <div
                aria-hidden="true"
                className="bg-accent rounded-sm py-3 px-4 grow"
              >
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
                <p className="text-xs text-text-subtle">
                  No sessions scheduled
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
