import { AdminCourse } from "@/types";

export function handleExportCourses(tableData: { nodes: AdminCourse[] }) {
  const headers = [
    "Course Name",
    "Course Code",
    "Department",
    "Credits",
    "Faculty",
    "Schedule",
    "Enrolled",
    "Status",
  ];

  const rows = tableData.nodes.map((c) => [
    c.course_name ?? "—",
    c.course_code ?? "—",
    c.department ?? "—",
    c.credits != null ? String(c.credits) : "—",
    c.faculty_name ?? "—",
    c.schedule ?? "—",
    `${c.enrolled_count ?? 0}/${c.max_students ?? "—"}`,
    c.status ?? "—",
  ]);

  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "courses.csv";
  a.click();
  URL.revokeObjectURL(url);
}
