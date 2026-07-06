interface GradesHeaderProps {
  courseName: string;
  courseCode: string;
  totalStudents: string;
  semester: string;
  isUpdating: boolean;
}

export default function GradesHeader({
  courseName,
  courseCode,
  totalStudents,
  semester,
  isUpdating,
}: GradesHeaderProps) {
  return (
    <div className="card flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
      <div className="space-y-1">
        <h3 className="title">{courseName}</h3>
        <div className="flex gap-1.5 md:gap-3 items-center flex-wrap">
          <span className="text-text-secondary text-sm md:text-base min-w-fit">
            {courseCode}
          </span>
          <div
            aria-hidden="true"
            className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full"
          />
          <span className="text-text-secondary text-sm md:text-base min-w-fit">
            {totalStudents} Students
          </span>
          <div
            aria-hidden="true"
            className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full"
          />
          <span className="text-text-secondary text-sm md:text-base min-w-fit">
            {semester}
          </span>
        </div>
      </div>
      <button
        type="submit"
        disabled={isUpdating}
        className="btn btn-dark py-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isUpdating ? "Saving..." : "Save Grades"}
      </button>
    </div>
  );
}
