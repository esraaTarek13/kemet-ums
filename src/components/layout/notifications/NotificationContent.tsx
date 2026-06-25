import { typeColors } from "@/data/shared/notificationColors";
import { Notification } from "@/types";
import { formatDistanceToNow } from "date-fns";

export default function NotificationContent({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <>
      <span
        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full w-fit mb-1 ${typeColors[notification.type]}`}
      >
        {notification.type}
      </span>
      <span className="text-xs md:text-sm text-text-primary font-medium">
        {notification.title}
      </span>
      {notification.body && (
        <span className="text-xs text-text-subtle">{notification.body}</span>
      )}
      <span className="text-[10px] text-text-subtle mt-1">
        {formatDistanceToNow(new Date(notification.created_at), {
          addSuffix: true,
        })}
      </span>
    </>
  );
}
