export type AnnouncementAudience = "all" | "students" | "faculty";
export type AnnouncementPriority = "urgent" | "important" | "normal";
export type AnnouncementStatus = "active" | "scheduled" | "expired";

export interface AdminAnnouncement {
  id: string;
  title: string;
  content: string;
  audience: AnnouncementAudience;
  priority: AnnouncementPriority;
  status: AnnouncementStatus;
  views: number;
  created_at: string;
}

export interface AdminAnnouncementsStats {
  total: number;
  active: number;
  scheduled: number;
  expired: number;
}

export interface AdminAnnouncementsResponse {
  stats: AdminAnnouncementsStats;
  announcements: AdminAnnouncement[];
}

export type AnnouncementStatusFilter = AnnouncementStatus;

export interface CreateAnnouncementPayload {
  title: string;
  content: string;
  audience?: AnnouncementAudience;
  priority?: AnnouncementPriority;
  status?: AnnouncementStatus;
}

export interface CreateAnnouncementResponse {
  success: boolean;
  id: string;
}

export interface UpdateAnnouncementPayload {
  id: string;
  title?: string;
  content?: string;
  audience?: AnnouncementAudience;
  priority?: AnnouncementPriority;
  status?: AnnouncementStatus;
}

export interface UpdateAnnouncementResponse {
  success: boolean;
}

export interface DeleteAnnouncementResponse {
  success: boolean;
}