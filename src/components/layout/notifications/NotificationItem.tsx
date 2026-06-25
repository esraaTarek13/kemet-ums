"use client";
import Link from "next/link";
import type { Notification } from "@/types";
import NotificationContent from "./NotificationContent";

interface NotificationItemProps {
  notification: Notification;
  onClose: () => void;
}

export default function NotificationItem({
  notification,
  onClose,
}: NotificationItemProps) {
  return (
    <li className={!notification.is_read ? "bg-accent/5" : ""}>
      {notification.link ? (
        <Link
          href={notification.link}
          onClick={onClose}
          className="w-full flex flex-col px-4 py-2 hover:bg-accent/10 cursor-pointer transition-colors text-left"
        >
          <NotificationContent notification={notification} />
        </Link>
      ) : (
        <div className="w-full flex flex-col px-4 py-2">
          <NotificationContent notification={notification} />
        </div>
      )}
    </li>
  );
}
