import { Assignment } from "@/types";
import AssignmentItem from "./AssignmentItem";

interface AssignmentsCardProps {
  assignments: Assignment[];
}

export default function AssignmentsCard({ assignments }: AssignmentsCardProps) {
  if (assignments.length === 0) {
    return (
      <p role="status" className="text-text-muted text-center py-10">
        No assignments found.
      </p>
    );
  }

  return (
    <ul role="list" className="space-y-5 md:space-y-6 w-full">
      {assignments.map((assignment) => (
        <AssignmentItem
          key={assignment.assignment_id}
          assignment={assignment}
        />
      ))}
    </ul>
  );
}
