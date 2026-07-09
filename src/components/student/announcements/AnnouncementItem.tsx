import {
  PRIORITY_CONFIG,
  STATUS_CONFIG,
} from "@/data/shared/announcementsConfig";
import { Announcement } from "@/types";
import { format } from "date-fns";

interface AnnouncementItemProps {
  announcement: Announcement ;
}

export default function AnnouncementItem({
  announcement,
}: AnnouncementItemProps) {
  // Resolve icon/styles based on priority and status
  const { icon: Icon, className: priorityClassName } =
    PRIORITY_CONFIG[announcement.priority];
  const { label, className: statusClassName } =
    STATUS_CONFIG[announcement.status];

  return (
    <li className="card-top-border md:border-t-0 md:border-l-4 border-accent mt-8 flex gap-3">
      {/* Priority icon */}
      <div
        className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${priorityClassName}`}
      >
        <Icon size={18} />
      </div>

      <div className="space-y-1">
        {/* Title + priority & status badges */}
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 md:gap-3 sm:items-center">
          <h5 className="font-semibold text-text-primary text-base md:text-lg">
            {announcement.title}
          </h5>
          <div className="flex gap-3 items-center">
            <span
              className={`w-fit py-0.5 px-2 rounded-full text-xs ${priorityClassName}`}
            >
              {announcement.priority}
            </span>
            <span
              className={`w-fit py-0.5 px-2 rounded-full text-xs ${statusClassName}`}
            >
              {label}
            </span>
          </div>
        </div>

        {/* Announcement body */}
        <p className="text-xs md:text-sm text-text-muted">
          {announcement.content}
        </p>

        {/* Formatted creation date */}
        <p className="text-xs text-text-subtle">
          {format(new Date(announcement.created_at), "MMM dd, yyyy")}
        </p>
      </div>
    </li>
  );
}
