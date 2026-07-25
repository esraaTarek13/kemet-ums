"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import WeeklyScheduleSkeleton from "@/components/ui/skeletons/WeeklyScheduleSkeleton";
import { useStudentCourseDetails } from "@/hooks/student/courses/useStudentCourseDetails";
import { mapToWeeklySchedule } from "@/lib/mappers/shared/weeklyScheduleMappers";
import { useMemo } from "react";
import WeeklyScheduleItem from "./WeeklyScheduleItem";

export default function WeeklyScheduleCard({ courseId }: { courseId: string }) {
  const { data, isError, isPending } = useStudentCourseDetails(courseId);
  const course = data?.course;

  const weeklySchedule = useMemo(() => mapToWeeklySchedule(course), [course]);

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
          <WeeklyScheduleItem key={day} day={day} session={session} />
        ))}
      </ul>
    </section>
  );
}
