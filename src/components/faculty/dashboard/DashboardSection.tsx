import HeroBanner from "@/components/ui/dashboard/HeroBanner";
import StatCards from "./StatCards";
import Performance from "./Performance";
import ActiveCourses from "./active-courses/ActiveCourses.lazy";
import RecentSubmissions from "./recent-submissions/RecentSubmissions.lazy";
import DayScheduleCard from "./schedule/DayScheduleCard";

export default function DashboardSection() {
  return (
    <>
      <HeroBanner subtle="Here is your teaching overview." />
      <StatCards />
      <div className="h-full w-full flex flex-col lg:flex-row gap-5 md:gap-6">
        <div className="h-full w-full lg:flex-1 min-w-0 space-y-5 md:space-y-6">
          <ActiveCourses />
          <RecentSubmissions />
        </div>
        <div className="space-y-5 md:space-y-6">
          <DayScheduleCard />
          <Performance />
        </div>
      </div>
    </>
  );
}
