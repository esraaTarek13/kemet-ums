import FacultyStats from "./FacultyStats";
import AddFacultyModal from "./add-faculty/AddFacultyModal";
import FacultyTable from "./faculty-table/FacultyTable";


export default function FacultySection() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="title">Faculty Management</h3>
        <AddFacultyModal />
      </div>

      <FacultyStats />

      <FacultyTable />
    </>
  );
}
