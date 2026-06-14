import ScheduleCalendar from "@/components/student/schedule/ScheduleCalendar";
import TodayAgenda from "@/components/student/schedule/TodayAgenda";

export default function SchedulePage() {
  return (
    <section className="Custom-container w-full h-full flex flex-col lg:flex-row gap-6">
      <div className="lg:grow h-fit">
        <ScheduleCalendar />
      </div>
      <TodayAgenda />
    </section>
  );
}
