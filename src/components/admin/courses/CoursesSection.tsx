import CoursesStats from "./CoursesStats";
import CoursesTable from "./courses-table/CoursesTable.lazy";
import AddCourseModal from "./add-course/AddCourseModal";

export default function CoursesSection() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="title">Course Management</h3>
        <AddCourseModal />
      </div>

      <CoursesStats />

      <CoursesTable />
    </>
  );
}
