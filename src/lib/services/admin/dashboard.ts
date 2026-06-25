import {
  Announcement,
  DashboardStats,
  EnrollmentTrendResponse,
  RecentStudent,
  ReportsSummary,
} from "@/types";
import { supabase } from "@/lib/supabase/client";

export async function getDashboardStats(): Promise<DashboardStats> {
  const { data, error } = await supabase.rpc("get_admin_dashboard_stats");
  if (error) throw new Error(error.message);
  return data as DashboardStats;
}

export async function getRecentStudents(limit = 5): Promise<RecentStudent[]> {
  const { data, error } = await supabase
    .from("students_full_view")
    .select("*")
    .order("enrollment_date", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data as RecentStudent[];
}

export async function getRecentAnnouncements(
  limit = 3,
): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data as Announcement[];
}

export async function getEnrollmentTrend(
  page = 1,
  pageSize = 6,
): Promise<EnrollmentTrendResponse> {
  const { data, error } = await supabase.rpc("get_enrollment_trend", {
    p_page: page,
    p_page_size: pageSize,
  });
  if (error) throw new Error(error.message);

  const rows = data as {
    month: string;
    month_date: string;
    count: number;
    total_count: number;
    total_pages: number;
  }[];

  const total_pages = rows[0]?.total_pages ?? 1;

  return {
    data: rows.map((r) => ({ month: r.month, count: r.count })),
    total_pages,
    current_page: page,
    has_next: page < total_pages,
    has_prev: page > 1,
  };
}

export async function getReportsSummary(): Promise<ReportsSummary> {
  const { data, error } = await supabase.rpc("get_admin_reports_summary");
  if (error) throw new Error(error.message);
  return data as ReportsSummary;
}