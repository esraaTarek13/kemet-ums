import {
  Announcement,
  DashboardStats,
  EnrollmentTrendResponse,
  RecentStudent,
  ReportsSummary,
} from "@/types";
import { supabase } from "@/lib/supabase/client";

export async function getDashboardStats(): Promise<DashboardStats> {
  const { data, error } = await supabase.rpc("get_dashboard_stats");
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

// Paginated monthly enrollment data for charts
export async function getEnrollmentTrend(
  page = 0,
  windowSize = 6,
): Promise<EnrollmentTrendResponse> {
  const { data, error } = await supabase.rpc("get_enrollment_trend", {
    page_number: page,
    window_size: windowSize,
  });
  if (error) throw new Error(error.message);
  return data as EnrollmentTrendResponse;
}

// Returns academic performance % and attendance rate %
export async function getReportsSummary(): Promise<ReportsSummary> {
  const { data, error } = await supabase.rpc("get_reports_summary");
  if (error) throw new Error(error.message);
  return data as ReportsSummary;
}
