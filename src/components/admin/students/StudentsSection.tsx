import StudentsStats from "./StudentsStats";
import AddStudentModal from "./add-student/AddStudentModal";
import StudentsTable from "./students-table/StudentsTable";

export default function StudentsSection() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="title">Student Management</h3>
        <AddStudentModal />
      </div>

      <StudentsStats />

      <StudentsTable />
    </>
  );
}
