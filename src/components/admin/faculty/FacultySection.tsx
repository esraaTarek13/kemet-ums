import { FiPlus } from "react-icons/fi";
import FacultyStats from "./FacultyStats";
import FacultyTable from "./faculty-table/FacultyTable";


export default function FacultySection() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="title">Faculty Management</h3>
        <button
          type="button"
          className="btn btn-dark flex items-center gap-2 py-2"
        >
          <FiPlus className="text-sm md:text-xl shrink-0" />
          <span className="text-sm md:text-base">Add New Faculty</span>
        </button>
      </div>

      <FacultyStats />

      <FacultyTable />
    </>
  );
}
