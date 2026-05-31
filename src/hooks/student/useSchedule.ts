import { useStudentDashboard } from "./useDashboard";
import { RRule } from "rrule";

// Maps 3-letter day abbreviations to RRule weekday constants
const RRULE_DAY_MAP: Record<string, typeof RRule.MO> = {
  SUN: RRule.SU,
  MON: RRule.MO,
  TUE: RRule.TU,
  WED: RRule.WE,
  THU: RRule.TH,
  FRI: RRule.FR,
  SAT: RRule.SA,
};

// Transforms schedule data into recurring calendar events via RRule
export function useSchedule() {
  const { data, isPending, isError } = useStudentDashboard();
  const schedule = data?.schedule ?? [];

  const events = schedule.map((event, i) => ({
    id: `${i}`,
    title: event.course_code,
    description: event.room,
    start: new Date(`${event.term_start}T${event.start_time}`),
    end: new Date(`${event.term_start}T${event.end_time}`),
    rrule: {
      freq: RRule.WEEKLY,
      byweekday: event.days.map(
        (day: string) => RRULE_DAY_MAP[day.toUpperCase()],
      ),
      dtstart: new Date(`${event.term_start}T${event.start_time}`),
      until: new Date(`${event.term_end}T23:59:59`),
    },
  }));

  return { events, isPending, isError };
}
