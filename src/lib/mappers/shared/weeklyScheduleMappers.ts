interface CourseSchedule {
  day_of_week: string[] | null;
  start_time: string | null;
  end_time: string | null;
  room: string | null;
}

const DAYS = ["SU", "MO", "TU", "WE", "TH"];

export function mapToWeeklySchedule(course?: CourseSchedule) {
  return DAYS.map((day) => ({
    day,
    session: course?.day_of_week?.includes(day)
      ? {
          time: `${course.start_time?.slice(0, 5) ?? ""} – ${course.end_time?.slice(0, 5) ?? ""}`,
          room: course.room ?? "",
        }
      : null,
  }));
}
