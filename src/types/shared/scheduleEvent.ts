export interface ScheduleEventSource {
  course_code: string;
  room: string;
  term_start: string;
  term_end: string;
  start_time: string;
  end_time: string;
  days: string[];
}