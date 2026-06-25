"use client";
import { useNotificationPanel } from "@/hooks/shared/notifications/useNotificationPanel";
import { FaRegBell } from "react-icons/fa";
import NotificationItem from "./NotificationItem";

export default function NotificationBell() {
  const { ref, open, unreadCount, notifications, handleOpen, close } =
    useNotificationPanel();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={handleOpen}
        className="relative"
      >
        <FaRegBell aria-hidden="true" className="text-text-primary text-xl" />
        {unreadCount > 0 && (
          <span
            aria-label={`${unreadCount} unread notifications`}
            className="absolute -top-1.5 -right-1.5 bg-accent text-text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-8 w-80 bg-bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h6 className="font-bold text-sm text-text-primary">
              Notifications
            </h6>
          </div>

          <ul className="flex flex-col py-2 max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="px-4 py-6 text-center text-sm text-text-muted">
                No notifications yet.
              </li>
            ) : (
              notifications.map((n) => (
                <NotificationItem key={n.id} notification={n} onClose={close} />
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
