import { FacultyProfileHeader as FacultyProfileHeaderData } from "@/types";
import { format } from "date-fns";

export function mapToFacultyPersonalInfo(data?: FacultyProfileHeaderData) {
  const id = data?.faculty_id ?? "—";

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
      id: `${id}-join_date`,
      label: "Joined Date",
      value: format(new Date(data?.join_date ?? "—"), "MMM dd, yyyy"),
    },
    {
      id: `${id}-employment_type`,
      label: "Employment Type",
      value: data?.employment_type ?? "—",
    },
    {
      id: `${id}-office_location`,
      label: "Office Location",
      value: data?.office_location ?? "—",
    },
  ];
}
