import Announcements from "@/components/admin/dashboard/Announcements";
import EnrollmentSection from "@/components/admin/dashboard/enrollment/EnrollmentSection";
import RecentStudents from "@/components/admin/dashboard/recent-students/RecentStudents";
import ReportsSummary from "@/components/admin/dashboard/ReportsSummary";
import StatCards from "@/components/admin/dashboard/StatCards";
import HeroBanner from "@/components/ui/dashboard/HeroBanner";

export default function Dashboard() {
  return (
    <div className="Custom-container h-full flex flex-col gap-5 md:gap-6">
      <HeroBanner subtle="Here is the campus overview." />
      <StatCards />
      <div className="flex flex-col lg:flex-row gap-5 md:gap-6">
        <div className="space-y-5 md:space-y-6 grow">
          <EnrollmentSection />
          <RecentStudents />
        </div>
        <div className="space-y-5 md:space-y-6">
          <Announcements />
          <ReportsSummary />
        </div>
      </div>
    </div>
  );
}
