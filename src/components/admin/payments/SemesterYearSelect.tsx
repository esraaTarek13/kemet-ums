import { useAcademicYears } from "@/hooks/shared/useAcademicYears";
import SelectInput from "@/components/ui/shared/SelectInput";
import { useSemesters } from "@/hooks/shared/semesters";

interface SemesterYearSelectProps {
  semester: string;
  academicYear: string;
  onSemesterChange: (value: string) => void;
  onAcademicYearChange: (value: string) => void;
}

export default function SemesterYearSelect({
  semester,
  academicYear,
  onSemesterChange,
  onAcademicYearChange,
}: SemesterYearSelectProps) {
  const { data: semesters = [] } = useSemesters();
  const { data: academicYears = [] } = useAcademicYears();

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 ">
      <SelectInput
        placeholder="Select semester"
        options={semesters}
        value={semester}
        onChange={onSemesterChange}
      />

      <SelectInput
        placeholder="Select year"
        options={academicYears}
        value={academicYear}
        onChange={onAcademicYearChange}
      />
    </div>
  );
}
