import ScheduleCalendar from "@/components/student/schedule/ScheduleCalendar";
import StudentTodayAgenda from "@/components/student/schedule/StudentTodayAgenda";

export default function SchedulePage() {
  return (
    <section className="Custom-container w-full h-full flex flex-col lg:flex-row gap-6">
      <div className="lg:grow h-fit">
        <ScheduleCalendar />
      </div>
      <StudentTodayAgenda />
    </section>
  );
}
