import { IoBookOutline } from "react-icons/io5";
import CoursesTable from "./courses-table/CoursesTable";
import GpaCard from "./GpaCard";
import GpaTrendChart from "./GpaTrendChart";
import TranscriptSummaryBar from "./TranscriptSummaryBar";

export default function GradesSection() {
  return (
    <>
      <div className="space-y-2">
        <h3 className="title">Grades & Transcript</h3>
        <p className="flex gap-3 items-center text-text-secondary">
          <IoBookOutline aria-hidden="true" />
          <span className="text-xs md:text-sm lg:text-base">
            Official academic performance record
          </span>
        </p>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-5 md:gap-6">
        <div className="w-full lg:flex-1 min-w-0">
          <CoursesTable />
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
          <GpaCard />
          <GpaTrendChart />
        </div>
      </div>
      <TranscriptSummaryBar />
    </>
  );
}
