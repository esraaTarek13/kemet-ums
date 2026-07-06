import { AdminFaculty } from "@/types";

export function handleExportFaculty(tableData: { nodes: AdminFaculty[] }) {
  const headers = [
    "Faculty Name",
    "ID",
    "Department",
    "Rank",
    "Employment Type",
    "Courses",
    "Students",
    "Status",
  ];

  const rows = tableData.nodes.map((f) => [
    f.full_name ?? "—",
    f.faculty_code ?? "—",
    f.department ?? "—",
    f.rank ?? "—",
    f.employment_type ?? "—",
    f.courses_count != null ? String(f.courses_count) : "—",
    f.students_count != null ? String(f.students_count) : "—",
    f.status ?? "—",
  ]);

  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "faculty.csv";
  a.click();
  URL.revokeObjectURL(url);
}
