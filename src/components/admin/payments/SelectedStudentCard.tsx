import { StudentSearchResult } from "@/types";

interface SelectedStudentCardProps {
  student: StudentSearchResult;
  onChange: () => void;
}

export default function SelectedStudentCard({
  student,
  onChange,
}: SelectedStudentCardProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-2 rounded-lg border border-text-secondary/30 px-4 py-2.5">
      <div>
        <span className="font-bold text-accent text-sm md:text-base min-w-fit">
          {student.full_name}
        </span>
        <span className="text-text-secondary text-xs md:text-sm min-w-fit">
          — {student.student_code}
        </span>
      </div>
      <button
        type="button"
        onClick={onChange}
        className="text-text-secondary text-xs lg:text-sm font-bold cursor-pointer"
      >
        Change
      </button>
    </div>
  );
}
