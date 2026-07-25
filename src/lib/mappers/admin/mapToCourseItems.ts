import { CourseOfferingDetail } from "@/types";
import { format, parse } from "date-fns";

type CourseOffering = CourseOfferingDetail;

const DAY_LABELS: Record<string, string> = {
  SU: "Sun",
  MO: "Mon",
  TU: "Tue",
  WE: "Wed",
  TH: "Thu",
  FR: "Fri",
  SA: "Sat",
};

function formatDays(days?: string[]) {
  if (!days || days.length === 0) return "—";
  return days.map((d) => DAY_LABELS[d] ?? d).join(", ");
}

function formatTime(time?: string) {
  if (!time) return "—";
  try {
    const parsed = parse(time, "HH:mm:ss", new Date());
    return format(parsed, "h:mm a");
  } catch {
    return "—";
  }
}

function formatTimeSlot(start?: string, end?: string) {
  if (!start || !end) return "—";
  return `${formatTime(start)} - ${formatTime(end)}`;
}

export function mapToCourseItems(offering?: CourseOffering) {
  const id = offering?.offering_id ?? "—";

  return [
    {
      id: `${id}-course_code`,
      label: "Course Code",
      value: offering?.course_code ?? "—",
    },
    {
      id: `${id}-course_name`,
      label: "Course Name",
      value: offering?.course_name ?? "—",
    },
    {
      id: `${id}-department`,
      label: "Department",
      value: offering?.department ?? "—",
    },
    {
      id: `${id}-faculty_name`,
      label: "Faculty Member",
      value: offering?.faculty_name ?? "—",
    },
    {
      id: `${id}-credits`,
      label: "Credits",
      value: offering?.credits != null ? `${offering.credits} Credits` : "—",
    },
    { id: `${id}-status`, label: "Status", value: offering?.status ?? "—" },
    { id: `${id}-room`, label: "Classroom", value: offering?.room ?? "—" },
    {
      id: `${id}-schedule`,
      label: "Schedule",
      value: formatDays(offering?.day_of_week),
    },
    {
      id: `${id}-time_slot`,
      label: "Time Slot",
      value: formatTimeSlot(offering?.start_time, offering?.end_time),
    },
    {
      id: `${id}-academic_year`,
      label: "Academic Year",
      value: offering?.academic_year ?? "—",
    },
    {
      id: `${id}-semester`,
      label: "Academic Term",
      value: offering?.semester ?? "—",
    },
    {
      id: `${id}-max_students`,
      label: "Capacity",
      value:
        offering?.max_students != null ? `${offering.max_students} Max` : "—",
    },
    {
      id: `${id}-enrollment`,
      label: "Enrollment",
      value:
        offering?.enrolled_count != null && offering?.max_students != null
          ? `${offering.enrolled_count} / ${offering.max_students}`
          : "—",
    },
    {
      id: `${id}-capacity_pct`,
      label: "Capacity %",
      value: offering?.capacity_pct != null ? `${offering.capacity_pct}%` : "—",
    },
  ];
}
