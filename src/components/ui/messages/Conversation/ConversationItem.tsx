import { ROLE_BASE_ROUTES } from "@/data/shared/roles";
import { useAuthStore } from "@/stores/authStore";
import { CourseThread } from "@/types";
import { format } from "date-fns";
import Link from "next/link";

interface Props {
  courseThread: CourseThread;
  isSelected: boolean;
}

export default function ConversationItem({ courseThread, isSelected }: Props) {
  const { user } = useAuthStore();
  const base = ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/";

  // Guard against invalid date values from the server
  const lastMessageDate = courseThread.last_message?.created_at
    ? new Date(courseThread.last_message.created_at)
    : null;
  const formattedTime =
    lastMessageDate && !isNaN(lastMessageDate.getTime())
      ? format(lastMessageDate, "hh:mm a")
      : null;

  return (
    <li>
      <Link
        href={`${base}/messages/${courseThread.course_id}`}
        aria-current={isSelected ? "page" : undefined}
        className={`w-full min-w-fit flex items-center gap-4 px-4 py-5 border-l-4 rounded-lg transition duration-200 ${
          isSelected
            ? "bg-bg-filter border-accent"
            : "border-transparent hover:bg-bg-filter hover:border-accent"
        }`}
      >
        <div
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-accent"
        />
        <div className="w-full space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h5 className="font-bold text-sm text-text-primary">
              {courseThread.course_code || "_"}
            </h5>
            <span
              className={`font-medium text-xs ${isSelected ? "text-text-secondary" : "text-text-subtle"}`}
            >
              {formattedTime}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p
              className={`text-xs lg:text-sm max-w-48 w-fit truncate ${isSelected ? "text-text-primary" : "text-text-secondary"}`}
            >
              {courseThread.last_message?.content ?? "No messages yet."}
            </p>

            {courseThread.unread_count > 0 && (
              <span
                aria-label={`${courseThread.unread_count} unread messages`}
                className="w-5 h-5 p-0 m-0 bg-primary rounded-full flex items-center justify-center text-text-white text-xs font-bold"
              >
                {courseThread.unread_count}
              </span>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
}
