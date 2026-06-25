export interface Notification {
  id: string;
  type: "assignment" | "grade" | "material" | "announcement";
  title: string;
  body: string | null;
  link: string | null;
  is_read: boolean;
  created_at: string;
}

export interface NotificationsResponse {
  unread_count: number;
  notifications: Notification[];
}
