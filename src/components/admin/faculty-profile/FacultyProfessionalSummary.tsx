import {
  mapToAcademicStanding,
  mapToFacultyProfessionalSummary,
} from "@/lib/mappers/admin/mapToFacultyProfessionalSummary";
import { BiBadgeCheck } from "react-icons/bi";

interface FacultyProfessionalSummaryProps {
  facultyId?: string;
  specialization?: string | null;
  publications?: number | null;
  academicStanding?: string | null;
}

export default function FacultyProfessionalSummary({
  facultyId,
  specialization,
  publications,
  academicStanding,
}: FacultyProfessionalSummaryProps) {
  const items = mapToFacultyProfessionalSummary({
    facultyId,
    specialization,
    publications,
  });
  const standing = mapToAcademicStanding(academicStanding);

  return (
    <section className="card w-full lg:w-105">
      <h4 className="title border-b border-border-card pb-4">
        Professional Summary
      </h4>

      <div className="py-4 md:py-5 space-y-5 md:space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-2"
          >
            <p className="font-medium text-text-muted text-xs md:text-sm">
              {item.label}
            </p>
            <p className="font-bold text-accent text-xs md:text-sm">
              {item.value}
            </p>
          </div>
        ))}

        {standing && (
          <div className={`${standing.bg} rounded-md p-2 md:p-4 space-y-1`}>
            <p
              className={`${standing.text} text-[10px] md:text-xs uppercase font-bold tracking-wider flex items-center gap-1.5`}
            >
              {/* icon is purely decorative — label text already conveys the meaning */}
              <BiBadgeCheck
                aria-hidden="true"
                className="shrink-0 text-lg md:text-xl"
              />
              <span>Academic Standing</span>
            </p>

            <p className="text-text-primary text-xs md:text-sm font-medium">
              {standing.message}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
