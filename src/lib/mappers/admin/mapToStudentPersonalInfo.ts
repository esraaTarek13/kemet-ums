import { StudentProfileHeader as StudentProfileHeaderData } from "@/types";
import { format } from "date-fns";

export function mapToStudentPersonalInfo(data?: StudentProfileHeaderData) {
  const id = data?.student_id ?? "—";

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
      label: "Nationality",
      value: data?.nationality ?? "—",
    },
    {
      id: `${id}-address`,
      label: "Address",
      value: data?.address ?? "—",
    },
    {
      id: `${id}-date_of_birth`,
      label: "Date of Birth",
      value: data?.date_of_birth
        ? format(new Date(data.date_of_birth), "MMM dd, yyyy")
        : "—",
    },
    {
      id: `${id}-enrollment_date`,
      label: "Enrollment Date",
      value: data?.enrollment_date
        ? format(new Date(data.enrollment_date), "MMM dd, yyyy")
        : "—",
    },
  ];
}
