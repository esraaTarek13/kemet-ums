import { useSemesters } from "@/hooks/shared/semesters";
import * as Select from "@radix-ui/react-select";
import { IoIosArrowDown } from "react-icons/io";

interface SemesterYearSelectProps {
  semester: string;
  onSemesterChange: (value: string) => void;
}
export default function SemesterYearSelect({
  semester,
  onSemesterChange,
}: SemesterYearSelectProps) {
  const { data: semesters = [] } = useSemesters();

  return (
    <Select.Root value={semester} onValueChange={onSemesterChange}>
      <Select.Trigger
        className="flex items-center gap-1.5 border-l border-border px-4 text-sm md:text-base font-semibold text-accent cursor-pointer"
        aria-label="Academic year"
      >
        <Select.Value placeholder="Academic Year" />
        <Select.Icon>
          <IoIosArrowDown
            aria-hidden="true"
            className="text-xs md:text-sm lg:text-base shrink-0 text-accent"
          />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="card p-1.5 rounded-lg z-50 overflow-hidden shadow-md"
        >
          <Select.Viewport className="p-1">
            {semesters.map((semester) => (
              <Select.Item
                key={semester.value}
                value={semester.value}
                className="rounded-sm px-3 py-1.5 text-xs md:text-sm cursor-pointer outline-none data-highlighted:bg-primary/10"
              >
                <Select.ItemText>{semester.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
