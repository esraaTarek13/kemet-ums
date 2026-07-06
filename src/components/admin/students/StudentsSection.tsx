import { FiPlus } from "react-icons/fi";
import StudentsStats from "./StudentsStats";
import StudentsTable from "./students-table/StudentsTable";

export default function StudentsSection() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="title">Student Management</h3>
        <button
          type="button"
          className="btn btn-dark flex items-center gap-2 py-2"
        >
          <FiPlus className="text-sm md:text-xl shrink-0" />
          <span className="text-sm md:text-base">Add New Student</span>
        </button>
      </div>

      <StudentsStats />

      <StudentsTable />
    </>
  );
}
