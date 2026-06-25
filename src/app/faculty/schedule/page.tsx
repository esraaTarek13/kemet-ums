import FacultyTodayAgenda from "@/components/faculty/schedule/FacultyTodayAgenda";
import ScheduleCalendar from "@/components/faculty/schedule/ScheduleCalendar";

export default function SchedulePage() {
  return (
    <section className="Custom-container w-full h-full flex flex-col lg:flex-row gap-6">
      <div className="lg:grow h-fit">
        <ScheduleCalendar />
      </div>
      <FacultyTodayAgenda />
    </section>
  );
}
