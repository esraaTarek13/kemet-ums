export function hasScheduleConflict(
  a: {
    semester: string;
    academic_year: string;
    day_of_week: string[];
    start_time: string;
    end_time: string;
  },
  b: {
    semester: string;
    academic_year: string;
    day_of_week: string[];
    start_time: string;
    end_time: string;
  },
): boolean {
  if (a.semester !== b.semester || a.academic_year !== b.academic_year) {
    return false;
  }

  const daysA = a.day_of_week ?? [];
  const daysB = b.day_of_week ?? [];

  const sharesDay = daysA.some((day) => daysB.includes(day));
  if (!sharesDay) return false;

  return a.start_time < b.end_time && a.end_time > b.start_time;
}
