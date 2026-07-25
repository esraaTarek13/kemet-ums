import { mapToCourseEnrollmentChart } from "@/lib/mappers/admin/mapToCourseEnrollmentChart";
import { CourseOfferingDetail } from "@/types";
import DonutChart from "@/components/ui/charts/DonutChart";

interface EnrollmentTrendProps {
  course: CourseOfferingDetail | undefined;
}

export default function EnrollmentTrend({ course }: EnrollmentTrendProps) {
  if (!course) {
    return (
      <section  className="card space-y-5">
        <h4 className="title">Enrollment Overview</h4>
        <p className="text-text-secondary text-xs md:text-sm">
          No enrollment data available.
        </p>
      </section>
    );
  }

  const { occupancyPct, chartData } = mapToCourseEnrollmentChart(course);
  return (
    <section className="card space-y-5">
      <h4 className="title">Enrollment Overview</h4>

      <DonutChart
        data={chartData}
        centerValue={`${occupancyPct}%`}
        centerLabel="Occupancy"
        startAngle={90}
        endAngle={-270}
      />

      <div className="space-y-3 text-xs md:text-sm">
        {chartData.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-text-secondary">{entry.name}</span>
            </div>
            <span className="font-bold text-accent">{entry.value}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}
