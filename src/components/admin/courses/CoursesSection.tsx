import { FiPlus } from "react-icons/fi";
import CoursesStats from "./CoursesStats";
import CoursesTable from "./courses-table/CoursesTable";

export default function CoursesSection() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="title">Course Management</h3>
        <button
          type="button"
          className="btn btn-dark flex items-center gap-2 py-2"
        >
          <FiPlus className="text-sm md:text-xl shrink-0" />
          <span className="text-sm md:text-base hidden sm:block">Create New Course</span>
        </button>
      </div>

      <CoursesStats />

      <CoursesTable />
    </>
  );
}
