import { AdminUser } from "@/types";
import { Column } from "@table-library/react-table-library/types/compact";
import { format } from "date-fns";
import { FaEye } from "react-icons/fa6";

export type AdminRow = AdminUser & { id: string };

export const getAdminsColumns = (
  onView: (id: string) => void,
): Column<AdminRow>[] => [
  {
    label: "Name",
    renderCell: (item: AdminRow) => item.full_name ?? "—",
    select: true,
  },
  {
    label: "Email",
    renderCell: (item: AdminRow) => item.email ?? "—",
  },
  {
    label: "Role",
    renderCell: (item: AdminRow) => item.role?.replace("_", " ") ?? "—",
  },
  {
    label: "Phone",
    renderCell: (item: AdminRow) => item.phone ?? "—",
  },
  {
    label: "Joined At",
    renderCell: (item: AdminRow) =>
      item.created_at ? format(new Date(item.created_at), "dd/MM/yyyy") : "—",
  },
  {
    label: "Actions",
    renderCell: (item: AdminRow) => (
      <button
        type="button"
        onClick={() => onView(item.id)}
        className="text-text-secondary hover:text-accent/90 transition-colors cursor-pointer ml-4"
        aria-label="View admin details"
      >
        <FaEye size={16} />
      </button>
    ),
  },
];
