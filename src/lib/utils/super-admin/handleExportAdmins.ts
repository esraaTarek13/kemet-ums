import { AdminUser } from "@/types";

export function handleExportAdmins(tableData: {
  nodes: (AdminUser & { id: string })[];
}) {
  const headers = ["Name", "Email", "Role", "Phone", "Joined At"];

  const rows = tableData.nodes.map((a) => [
    a.full_name ?? "—",
    a.email ?? "—",
    a.role ?? "—",
    a.phone ?? "—",
    a.created_at
      ? new Date(a.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : "—",
  ]);

  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "admins.csv";
  a.click();
  URL.revokeObjectURL(url);
}