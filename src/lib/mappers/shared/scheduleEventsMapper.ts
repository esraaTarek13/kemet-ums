import dayjs from "dayjs";
import { FacultyScheduleEvent } from "@/types";
import { ScheduleEventSource } from "@/types/shared/scheduleEvent";
import { RRule } from "rrule";

// Maps 3-letter day abbreviations to RRule weekday constants
const RRULE_DAY_MAP: Record<string, typeof RRule.MO> = {
  SU: RRule.SU,
  MO: RRule.MO,
  TU: RRule.TU,
  WE: RRule.WE,
  TH: RRule.TH,
  FR: RRule.FR,
  SA: RRule.SA,
};

// Builds recurring calendar events from schedule data
export function mapToScheduleEvents<
  T extends ScheduleEventSource | FacultyScheduleEvent,
>(schedule: T[] | undefined) {
  return (schedule ?? []).map((event, i) => ({
    id: `${event.course_code}-${i}`,
    title: event.course_code,
    description: event.room,
     start: dayjs(`${event.term_start}T${event.start_time}`),
    end: dayjs(`${event.term_start}T${event.end_time}`),
    rrule: {
      freq: RRule.WEEKLY,
      byweekday: (event.days ?? [])
        .map((day: string) => RRULE_DAY_MAP[day.toUpperCase()])
        .filter(Boolean),
      dtstart: new Date(`${event.term_start}T${event.start_time}`),
      until: new Date(`${event.term_end}T23:59:59`),
    },
  }));
}
