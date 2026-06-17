import { StudentProfileResponse } from "@/types";
import { format } from "date-fns";

type Profile = StudentProfileResponse["profile"];
type Student = StudentProfileResponse["student"];

export function mapToBannerItems(profile?: Profile, student?: Student) {
  return {
    name: profile?.full_name ?? "—",
    Id: student?.student_code ?? "—",
    department: student?.department ?? "—",
    year: student?.academic_year ? `Year ${student.academic_year}` : "—",
    avatarUrl: profile?.avatar_url ?? null,
  };
}

export function mapToAcademicItems(profile?: Profile, student?: Student) {
  return [
    { label: "University Email", value: profile?.email ?? "—" },
    { label: "Student ID", value: student?.student_code ?? "—" },
    { label: "Department", value: student?.department ?? "—" },
    {
      label: "Academic Year",
      value: student?.academic_year ? `Year ${student.academic_year}` : "—",
    },
    {
      label: "Enrollment Date",
      value: student?.enrollment_date
        ? format(new Date(student.enrollment_date), "MMM d, yyyy")
        : "—",
    },
  ];
}

export function mapToPersonalItems(profile?: Profile, student?: Student) {
  return [
    { label: "Full Name", value: profile?.full_name ?? "—" },
    {
      label: "Date of Birth",
      value: student?.date_of_birth
        ? format(new Date(student.date_of_birth), "dd/MM/yyyy")
        : "—",
    },
    { label: "Phone Number", value: profile?.phone ?? "—" },
    { label: "Nationality", value: profile?.nationality ?? "—" },
    { label: "Residential Address", value: profile?.address ?? "—" },
  ];
}