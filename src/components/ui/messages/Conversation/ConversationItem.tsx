import { CourseThread } from "@/types";
import { format } from "date-fns";

interface Props {
  CourseThread: CourseThread;
  isSelected: boolean;
  onSelect: () => void;
}

export default function ConversationItem({
  CourseThread,
  isSelected,
  onSelect,
}: Props) {
  return (
    <li
      onClick={onSelect}
      role="button"
      aria-current={isSelected ? "true" : undefined}
      className={`w-full min-w-fit flex items-center gap-4 px-4 py-5 border-l-4 rounded-lg cursor-pointer transition duration-200 ${
        isSelected
          ? "bg-bg-filter border-accent"
          : "border-transparent hover:bg-bg-filter hover:border-accent"
      }`}
    >
      <div aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
      <div className="w-full space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h5 className="font-bold text-sm text-text-primary">
            {CourseThread.course_code || "_"}
          </h5>
          <span
            className={`font-medium text-xs ${isSelected ? "text-text-secondary" : "text-text-subtle"}`}
          >
            {CourseThread.last_message?.created_at
              ? format(
                  new Date(CourseThread.last_message.created_at),
                  "hh:mm a",
                )
              : null}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p
            className={`text-xs lg:text-sm max-w-50 w-fit truncate ${isSelected ? "text-text-primary" : "text-text-secondary"}`}
          >
            {CourseThread.last_message?.content ?? "No messages yet."}
          </p>

          {CourseThread.unread_count !== 0 ? (
            <span
              aria-label={`${CourseThread.unread_count} unread messages`}
              className="w-5 h-5 p-0 m-0 bg-primary rounded-full flex items-center justify-center text-text-white text-xs font-bold"
            >
              {CourseThread.unread_count}
            </span>
          ) : null}
        </div>
      </div>
    </li>
  );
}
