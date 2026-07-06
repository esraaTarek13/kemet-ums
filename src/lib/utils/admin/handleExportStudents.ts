import { AdminStudent } from "@/types";

export function handleExportStudents(tableData: { nodes: AdminStudent[] }) {
  const headers = [
    "Student Name",
    "ID",
    "Department",
    "Academic Year",
    "Credits",
    "GPA",
    "Status",
  ];

  const rows = tableData.nodes.map((s) => [
    s.full_name ?? "—",
    s.student_code ?? "—",
    s.department ?? "—",
    s.academic_year != null ? String(s.academic_year) : "—",
    `${s.credits_completed ?? 0}/${s.max_credits ?? 0}`,
    s.gpa != null ? s.gpa.toFixed(2) : "—",
    s.status ?? "—",
  ]);

  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "students.csv";
  a.click();
  URL.revokeObjectURL(url);
}
