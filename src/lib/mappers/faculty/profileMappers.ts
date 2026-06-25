import { FacultyProfileResponse } from "@/types";
import { format } from "date-fns";

type Profile = FacultyProfileResponse["profile"];
type Faculty = FacultyProfileResponse["faculty"];

export function mapToBannerItems(profile?: Profile, faculty?: Faculty) {
  return {
    name: profile?.full_name ?? "—",
    Id: faculty?.faculty_code ?? "—",
    department: faculty?.department ?? "—",
    rank: faculty?.rank ?? "—",
    avatarUrl: profile?.avatar_url ?? null,
  };
}

export function mapToAcademicItems(profile?: Profile, faculty?: Faculty) {
  return [
    { label: "Faculty ID", value: faculty?.faculty_code ?? "—" },
    { label: "Department", value: faculty?.department ?? "—" },
    { label: "Rank", value: faculty?.rank ?? "—" },
    {
      label: "Employment Type",
      value: faculty?.employment_type
        ? faculty.employment_type.replace("_", " ")
        : "—",
    },
    {
      label: "Join Date",
      value: faculty?.join_date
        ? format(new Date(faculty.join_date), "MMM d, yyyy")
        : "—",
    },
    {
      label: "Max Courses",
      value: faculty?.max_courses != null ? String(faculty.max_courses) : "—",
    },
  ];
}

export function mapToPersonalItems(profile?: Profile, faculty?: Faculty) {
  return [
    { label: "Full Name", value: profile?.full_name ?? "—" },
    { label: "University Email", value: profile?.email ?? "—" },
    { label: "Office Location", value: faculty?.office_location ?? "—" },
    { label: "Phone Number", value: profile?.phone ?? "—" },
    { label: "Nationality", value: profile?.nationality ?? "—" },
    { label: "Residential Address", value: profile?.address ?? "—" },
  ];
}