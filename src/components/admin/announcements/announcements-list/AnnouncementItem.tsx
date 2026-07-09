import { PRIORITY_CONFIG } from "@/data/shared/announcementsConfig";
import { AdminAnnouncement } from "@/types";
import { format } from "date-fns";
import { CiCalendar } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import AnnouncementActionsMenu from "./AnnouncementActionsMenu";

interface AnnouncementItemProps {
  announcement: AdminAnnouncement;
  onEdit: () => void;
  onDelete: () => void;
}

export default function AnnouncementItem({
  announcement,
  onEdit,
  onDelete,
}: AnnouncementItemProps) {
  const { className: priorityClassName } =
    PRIORITY_CONFIG[announcement.priority];

  return (
    <li className="bg-bg-card border-l-4 border-accent p-4 md:p-6 rounded-xl space-y-2 list-none">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <span
            className={`py-0.5 px-2 rounded-full text-xs ${priorityClassName}`}
          >
            {/* Screen readers get context, sighted users get the raw label */}
            <span aria-hidden="true">{announcement.priority}</span>
            <span className="sr-only">Priority: {announcement.priority}</span>
          </span>
          <span className="text-[10px] text-text-subtle uppercase">
            {announcement.audience}
          </span>
        </div>

        <AnnouncementActionsMenu onEdit={onEdit} onDelete={onDelete} />
      </div>

      <div className="space-y-2">
        <h3 className="title">{announcement.title}</h3>
        {/* line-clamp is visual only; screen readers still get the full text */}
        <p className="text-text-muted text-xs md:text-sm line-clamp-2">
          {announcement.content}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <p className="flex gap-2 items-center text-text-subtle">
          <CiCalendar
            className="text-sm md:text-lg shrink-0"
            aria-hidden="true"
          />
          <span className="text-xs md:text-sm">
            <span className="sr-only">Created on </span>
            {format(new Date(announcement.created_at), "MMM dd, yyyy")}
          </span>
        </p>
        <p className="flex gap-2 items-center text-text-subtle">
          <FaRegEye
            className="text-xs md:text-sm shrink-0"
            aria-hidden="true"
          />
          <span className="text-xs md:text-sm">
            {announcement.views ?? 0} views
          </span>
        </p>
      </div>
    </li>
  );
}
