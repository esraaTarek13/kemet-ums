import { ScheduleEventSource } from "@/types/shared/scheduleEvent";
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

// Builds recurring calendar events from schedule data
export function mapToScheduleEvents<T extends ScheduleEventSource>(
  schedule: T[] | undefined,
) {
  return (schedule ?? []).map((event, i) => ({
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
}