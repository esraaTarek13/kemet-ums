import { AdminUser } from "@/types";
import { Column } from "@table-library/react-table-library/types/compact";
import { format } from "date-fns";
import { HiOutlineDotsVertical } from "react-icons/hi";

export type AdminRow = AdminUser & { id: string };

export const ADMINS_COLUMNS: Column<AdminRow>[] = [
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
      item.created_at
        ? format(new Date(item.created_at), "dd/MM/yyyy")
        : "—",
  },
  {
    label: "Actions",
    renderCell: () => (
      <button
        type="button"
        className="p-1 rounded hover:bg-bg-filter text-text-muted cursor-pointer"
        aria-label="Actions"
      >
        <HiOutlineDotsVertical className="text-lg" />
      </button>
    ),
  },
];