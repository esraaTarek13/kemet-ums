import { AdminProfileDetail } from "@/types";
import { format } from "date-fns";

export function mapToAdminPersonalInfo(data?: AdminProfileDetail) {
  const id = data?.id ?? "—";

  return [
    {
      id: `${id}-email`,
      label: "Email Address",
      value: data?.email ?? "—",
    },
    {
      id: `${id}-phone`,
      label: "Phone Number",
      value: data?.phone ?? "—",
    },
    {
      id: `${id}-nationality`,
      label: "Country",
      value: data?.nationality ?? "—",
    },
    {
      id: `${id}-address`,
      label: "Address",
      value: data?.address ?? "—",
    },
    {
      id: `${id}-join_date`,
      label: "Joined Date",
      value: data?.join_date
        ? format(new Date(data.join_date), "MMM dd, yyyy")
        : "—",
    },
  ];
}
