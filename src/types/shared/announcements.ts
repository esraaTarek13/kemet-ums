export interface Announcement {
  id: string;
  title: string;
  content: string;
  audience: "all" | "students" | "faculty";
  priority: "normal" | "important" | "urgent";
  status: "active" | "scheduled" | "expired";
  created_at: string;
}
