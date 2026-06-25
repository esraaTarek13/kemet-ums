import type { DueSoonItem } from "@/types";
import { formatDate } from "date-fns";
import { PiClipboardText } from "react-icons/pi";

interface DueSoonItemProps {
  task: DueSoonItem;
}

export default function DueSoonItem({ task }: DueSoonItemProps) {
  return (
    <article
      key={task.assignment_id}
      aria-label={`${task.title} — ${task.course_name}, due ${formatDate(task.due_date, "dd MMM yyyy")}`}
      className="card flex gap-4"
    >
      {/* status icon */}
      <div aria-hidden="true" className={`bg-bg-subtle p-2 rounded-lg h-fit`}>
        <PiClipboardText className={`text-text-secondary text-2xl shrink-0`} />
      </div>

      <div className="w-full">
        <h5 className="font-semibold text-text-primary text-sm">
          {task.title}
        </h5>

        {/* course · faculty — covered by article aria-label */}
        <div aria-hidden="true" className="text-text-subtle text-xs mb-4">
          <span>{task.course_name}</span>
          <span className="w-1.5 h-1.5 bg-text-subtle rounded-full mx-1 align-middle inline-block" />
          <span>{task.faculty_name}</span>
        </div>

        {/* status badge and due date */}
        <div className="w-full flex items-center justify-between flex-wrap">
          <p
            aria-hidden="true"
            className={`font-semibold text-xs text-text-secondary bg-bg-subtle py-0.5 px-2 rounded-full lowercase`}
          >
            {task.status.replace(/_/g, " ")}
          </p>
          <p className="text-text-subtle text-xs uppercase">
            {formatDate(task.due_date, "dd MMM")}
          </p>
        </div>
      </div>
    </article>
  );
}
