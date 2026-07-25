import Attendance from "@/components/student/dashboard/Attendance";
import Courses from "@/components/student/dashboard/Courses";
import DueSoonList from "@/components/student/dashboard/due-soon/DueSoonList";
import Schedule from "@/components/student/dashboard/schedule/Schedule.lazy";
import StatCards from "@/components/student/dashboard/StatCards";
import HeroBanner from "@/components/ui/dashboard/HeroBanner";

export default function Dashboard() {
  return (
    <div className="Custom-container flex flex-col gap-5 md:gap-6">
      <HeroBanner subtle="Here is your academic overview." />
      <StatCards />
      <Attendance />
      <div className="flex flex-col lg:flex-row gap-8 md:gap-6 mt-3">
        <div className="space-y-8 md:space-y-6 grow">
          <Courses />
          <Schedule />
        </div>
        <DueSoonList />
      </div>
    </div>
  );
}
