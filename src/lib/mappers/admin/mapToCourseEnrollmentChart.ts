import { CourseOfferingDetail } from "@/types";

const ENROLLMENT_COLORS = {
  enrolled: "var(--color-accent)",
  available: "var(--color-bg-bar)",
};

export function mapToCourseEnrollmentChart(course?: CourseOfferingDetail) {
  const occupancyPct = course?.capacity_pct != null ? Math.round(course.capacity_pct) : 0;
  const availablePct = 100 - occupancyPct;

  return {
    occupancyPct,
    enrolledCount: course?.enrolled_count ?? 0,
    maxStudents: course?.max_students ?? 0,
    chartData: [
      { name: "Enrolled Students", value: occupancyPct, color: ENROLLMENT_COLORS.enrolled },
      { name: "Available Seats", value: availablePct, color: ENROLLMENT_COLORS.available },
    ],
  };
}