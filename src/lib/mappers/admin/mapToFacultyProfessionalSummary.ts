import { FacultyProfileStats } from "@/types";

interface MapToFacultyProfessionalSummaryParams {
  facultyId?: string;
  specialization?: string | null;
  publications?: number | null;
}

export function mapToFacultyProfessionalSummary({
  facultyId,
  specialization,
  publications,
}: MapToFacultyProfessionalSummaryParams) {
  const id = facultyId ?? "—";

  return [
    {
      id: `${id}-specialization`,
      label: "Specialization",
      value: specialization ?? "—",
    },
    {
      id: `${id}-publications`,
      label: "Publications",
      value: publications != null ? `${publications} Research Papers` : "—",
    },
  ];
}

const ACADEMIC_STANDING_CONFIG: Record<
  FacultyProfileStats["academic_standing"],
  { message: string; bg: string; text: string }
> = {
  "Good Standing": {
    message: "Faculty is in Good Standing",
    bg: "bg-success-bg",
    text: "text-success",
  },
  Satisfactory: {
    message: "Faculty performance is Satisfactory",
    bg: "bg-pending-bg",
    text: "text-pending",
  },
  "Needs Improvement": {
    message: "Faculty needs improvement",
    bg: "bg-danger-bg",
    text: "text-danger",
  },
  "No Data": {
    message: "No academic standing data available",
    bg: "bg-bg-subtle",
    text: "text-text-subtle",
  },
};

export function mapToAcademicStanding(standing?: string | null) {
  if (!standing) return null;

  return (
    ACADEMIC_STANDING_CONFIG[
      standing as FacultyProfileStats["academic_standing"]
    ] ?? {
      message: standing,
      bg: "bg-bg-subtle",
      text: "text-text-subtle",
    }
  );
}
