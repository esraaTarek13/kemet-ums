interface CourseSchedule {
  days: string[];
  start_time: string;
  end_time: string;
  room: string;
}

const DAYS = ["SUN", "MON", "TUE", "WED", "THU"];

export function mapToWeeklySchedule(course?: CourseSchedule) {
  return DAYS.map((day) => ({
    day,
    session: course?.days?.includes(day)
      ? {
          time: `${course.start_time.slice(0, 5)} – ${course.end_time.slice(0, 5)}`,
          room: course.room,
        }
      : null,
  }));
}