import * as Tooltip from "@radix-ui/react-tooltip";
import { Assignment } from "@/types";
import AssignmentItem from "./AssignmentItem";

interface AssignmentsCardProps {
  assignments: Assignment[];
}

export default function AssignmentsCards({
  assignments,
}: AssignmentsCardProps) {
  if (assignments.length === 0) {
    return (
      <p role="status" className="text-text-muted text-center py-10">
        No assignments found.
      </p>
    );
  }

  return (
    <Tooltip.Provider delayDuration={300}>
      <ul role="list" className="space-y-5 md:space-y-6 w-full">
        {assignments.map((assignment) => (
          <AssignmentItem
            key={assignment.assignment_id}
            assignment={assignment}
          />
        ))}
      </ul>
    </Tooltip.Provider>
  );
}
