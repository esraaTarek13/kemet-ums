export interface FacultyScheduleEvent {
  course_code: string;
  course_name: string;
  days: string[];
  start_time: string;
  end_time: string;
  room: string;
  enrolled_count: number;
  term_start: string;
  term_end: string;
}