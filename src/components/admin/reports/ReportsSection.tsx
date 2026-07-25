"use client";
import DepartmentPerformanceTable from "./department-performance/DepartmentPerformanceTable.lazy";
import EnrollmentTrend from "./enrollment-trend/EnrollmentTrend.lazy";
import GpaDistribution from "./gpa-distribution/GpaDistribution.lazy";
import PaymentStats from "./PaymentStats";
import ReportsStats from "./ReportsStats";
import SemesterYearSelect from "@/components/ui/shared/SemesterYearSelect";
import PaymentsByDepartment from "./PaymentsByDepartment";
import PaymentStatusBreakdown from "./payment-status-breakdown/PaymentStatusBreakdown.lazy";
import { BiExport } from "react-icons/bi";
import { useReportsSection } from "@/hooks/admin/report/useReportsSection";

export default function ReportsSection() {
  const { semester, setSemester, academicYear, isExporting, handleExport } =
    useReportsSection();

  return (
    <>
      <div className="flex justify-between items-center gap-3">
        <h3 className="title">Reports & Analytics</h3>
        <button
          type="button"
          onClick={handleExport}
          disabled={!semester || isExporting}
          title={!semester ? "Select a semester first" : undefined}
          className="btn btn-dark flex items-center gap-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <BiExport className="text-sm md:text-lg font-bold shrink-0" />
          <span className="text-sm md:text-base hidden sm:block">
            {isExporting ? "Exporting..." : "Export All"}
          </span>
        </button>
      </div>

      <ReportsStats />

      <div className="flex flex-col md:flex-row gap-4">
        <EnrollmentTrend />
        <GpaDistribution />
      </div>

      <DepartmentPerformanceTable />

      <div className="flex items-center gap-4 flex-wrap mt-3">
        <h4 className="title text-text-primary border-l-4 border-accent pl-4">
          Financial Summary
        </h4>

        <SemesterYearSelect
          semester={semester}
          onSemesterChange={setSemester}
        />
      </div>

      {semester && (
        <PaymentStats semester={semester} academicYear={academicYear} />
      )}

      {semester && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PaymentsByDepartment
            semester={semester}
            academicYear={academicYear}
          />

          <PaymentStatusBreakdown
            semester={semester}
            academicYear={academicYear}
          />
        </div>
      )}
    </>
  );
}
