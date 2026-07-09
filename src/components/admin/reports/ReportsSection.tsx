import DepartmentPerformanceTable from "./department-performance/DepartmentPerformanceTable";
import EnrollmentTrend from "./enrollment-trend/EnrollmentTrend.lazy";
import GpaDistribution from "./gpa-distribution/GpaDistribution.lazy";

import ReportsStats from "./ReportsStats";

export default function ReportsSection() {
  return (
    <>
      <h3 className="title">Reports & Analytics</h3>

      <ReportsStats />

      <div className="flex flex-col md:flex-row gap-4">
        <EnrollmentTrend />
        <GpaDistribution  />
      </div>

      <DepartmentPerformanceTable />
    </>
  );
}
